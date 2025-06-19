import { pool } from '../config/dbConnection';

export const findUserByEmail = async (email: string) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const insertUser = async (user: {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role: string;
  is_active: boolean;
  password: string;
  created_at: Date;
}) => {
  const result = await pool.query(
    `INSERT INTO users (id, first_name, last_name, email, phone, role, is_active, password, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      user.id,
      user.first_name,
      user.last_name,
      user.email,
      user.phone,
      user.role,
      user.is_active,
      user.password,
      user.created_at,
    ]
  );
  return result.rows[0];
};
