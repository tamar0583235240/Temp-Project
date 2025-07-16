import { Request, Response } from 'express';
import { Users } from '../interfaces/entities/Users';
import userRepository from '../reposioty/userRepository';
import bcrypt from 'bcrypt';
import { pool } from '../config/dbConnection';
import { v4 as uuidv4 } from 'uuid';
import { insertUsersFromExcel } from '../reposioty/userRepository';
import { createUserByAdminSchema, updateUserByAdminSchema } from '../validations/userValidations';

const SALT_ROUNDS = 10;

// ממיר שורות DB ל־camelCase
function mapUserRowToCamelCase(row: any) {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    role: row.role,
    password: row.password,
    createdAt: row.created_dat || row.created_at,
    isActive: row.is_active,
  };
}

// החזרת כל המשתמשים
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.getAllUsers();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.json(users);
  } catch (err) {
    console.error('שגיאה בקבלת המשתמשים:', err);
    res.status(500).json({ error: 'אירעה שגיאה בעת טעינת המשתמשים' });
  }
};

// החזרת משתמש מחובר
export const getMe = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await userRepository.getUserById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ user });
};

// החזרת משתמש לפי ID
export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await userRepository.getUserById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

// יצירת משתמש על ידי Admin
export const createUserByAdmin = async (req: Request, res: Response) => {
  try {
    await createUserByAdminSchema.validate(req.body, { abortEarly: false });
    const { firstName, lastName, email, phone, role, password } = req.body;

    const checkEmail = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (checkEmail.rowCount && checkEmail.rowCount > 0) {
      return res.status(400).json({ error: 'אימייל זה כבר קיים במערכת' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const id = uuidv4();
    const createdAt = new Date();

    const result = await pool.query(
      `INSERT INTO users (id, first_name, last_name, email, phone, role, created_dat, is_active, password)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true, $8)
       RETURNING *`,
      [id, firstName, lastName, email, phone, role || 'student', createdAt, hashedPassword]
    );

    res.status(201).json(mapUserRowToCamelCase(result.rows[0]));
  } catch (error: any) {
    console.error('Create user error:', error);

    if (error.code === '23505' && error.constraint === 'users_email_key') {
      return res.status(400).json({ error: 'אימייל זה כבר קיים במערכת' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }

    res.status(500).json({ error: 'שגיאת שרת – יצירת משתמש נכשלה' });
  }
};

// עדכון משתמש ע"י Admin
export const updateUserByAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, role, password } = req.body;

  try {
    await updateUserByAdminSchema.validate(req.body, { abortEarly: false });

    const emailCheck = await pool.query(`SELECT id FROM users WHERE email = $1 AND id != $2`, [email, id]);
    if (emailCheck.rowCount && emailCheck.rowCount > 0) {
      return res.status(400).json({ error: 'אימייל זה כבר קיים במערכת' });
    }

    const hashedPassword = password ? await bcrypt.hash(password, SALT_ROUNDS) : null;

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
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// מחיקת משתמש ע"י Admin
export const deleteUserByAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// העלאת משתמשים מקובץ Excel
export const uploadUsersExcel = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send('לא נשלח קובץ');
    }

    const { insertedUsers, skippedUsers } = await insertUsersFromExcel(req.file.path);

    res.status(200).json({
      message: 'עיבוד הקובץ הסתיים',
      successCount: insertedUsers.length,
      skippedCount: skippedUsers.length,
      skippedUsers: skippedUsers.map(({ email, reason }) => ({ email, reason })),
    });
  } catch (error) {
    console.error('Excel upload error:', error);
    res.status(500).json({ error: 'שגיאה בעת עיבוד הקובץ' });
  }
};
