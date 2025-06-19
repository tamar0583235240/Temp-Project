import { pool } from '../config/dbConnection';
import { User } from '../interfaces/User';

// קבלת משתמש לפי אימייל בלבד
export const getUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
  return result.rows[0] || null;
};

// קבלת משתמש לפי אימייל וסיסמה (לצורכי login)
export const getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1 AND password = $2',
    [email, password]
  );
  return result.rows[0] || null;
};

// עדכון סיסמה
export const updateUserPassword = async (userId: string, hashedPassword: string) => {
  await pool.query(
    'UPDATE users SET password = $1 WHERE id = $2',
    [hashedPassword, userId]
  );
};

// יצירת משתמש חדש
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
      user.isActive,
      user.password,
    ]
  );

  return result.rows[0];
};

// שליפת כל המשתמשים
export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
  return result.rows;
};

// שליפת משתמש לפי מזהה
export const getUserById = async (id: string): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
};
