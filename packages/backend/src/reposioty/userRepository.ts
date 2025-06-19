import { pool } from '../config/dbConnection';
import { User } from '../interfaces/User';

export const getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1 AND password = $2',
    [email, password]
  );
  return result.rows[0] || null;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
};

export const createUser = async (user: Omit<User, 'id' | 'createdAt'> & { password: string }): Promise<User> => {
  const result = await pool.query(
    `INSERT INTO users (id, first_name, last_name, email, phone, role, created_at, is_active, password)
     VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), $6, $7)
     RETURNING *`,
    [
      user.firstName,
      user.lastName,
      user.email,
      user.phone,
      user.role,
      true,
      user.password,
    ]
  );

  return result.rows[0];
};


export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
  return result.rows;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
};