import { Request, Response } from 'express';
import { pool } from '../config/dbConnection';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { createUserSchema, updateUserSchema } from '../validations/userValidation'

function mapUserRowToCamelCase(row: any) {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    role: row.role,
    password: row.password, 
    createdAt: row.created_at,
    isActive: row.email && row.password ? true : false,
  };
}


export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, role, password } = req.body;
  const id = uuidv4();
  const createdAt = new Date();

  try {
    const validatedData = await createUserSchema.validate(req.body, { abortEarly: false });

    // שמירת הסיסמה כפי שהיא ללא הצפנה
    const result = await pool.query(
      `INSERT INTO users (id, first_name, last_name, email, phone, role, created_at, password)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [id, firstName, lastName, email, phone, role, createdAt, password]
    );

    res.status(201).json(mapUserRowToCamelCase(result.rows[0]));
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, role, password } = req.body;

  try {
        const validatedData = await updateUserSchema.validate(req.body, { abortEarly: false });

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const result = await pool.query(
      `UPDATE users SET 
        first_name = $1,
        last_name = $2,
        email = $3,
        phone = $4,
        role = $5,
        password = COALESCE($6, password)
       WHERE id = $7
       RETURNING *`,
      [firstName, lastName, email, phone, role, hashedPassword, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(mapUserRowToCamelCase(result.rows[0]));
  } catch (error:any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    const users = result.rows.map(mapUserRowToCamelCase);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
