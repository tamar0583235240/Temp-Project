import { pool } from '../config/dbConnection';
import { Users } from "../interfaces/entities/Users";
import { User } from '../interfaces/User';

const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
  return result.rows;
};

const getUserById = async (id: string): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user) throw new Error('User not found');

  const isPasswordValid = password === user.password; // Replace with proper password hashing check in production
  if (!isPasswordValid) throw new Error('Invalid password');

  return user;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) throw new Error('User not found');
    return result.rows[0] || null;
  } catch {
    throw new Error('User not found');
  }
};

const updateUser = async (id: string, userData: Partial<Users>): Promise<Users | null> => {
  try {
    const setQuery = Object.entries(userData)
      .map(([key], i) => `${key} = $${i + 1}`)
      .join(', ');
    const values = Object.values(userData);

    const res = await pool.query(
      `UPDATE users SET ${setQuery} WHERE id = $${values.length + 1} RETURNING *`,
      [...values, id]
    );

    return (res.rows[0] as Users) || null;
  } catch (error) {
    console.error("Error updating user in local DB:", error);
    throw error;
  }
};

const createUser = async (user: Omit<User, 'id' | 'createdAt'> & { password: string }): Promise<User> => {
  try {
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
    return (result.rows[0] as User) || null;
  } catch (error) {
    console.error("Error creating user in local DB:", error);
    throw error;
  }
};

const deleteUser = async (id: string): Promise<void> => {
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  } catch (error) {
    console.error("Error deleting user from local DB:", error);
    throw error;
  }
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmailAndPassword,
  getUserByEmail,
  updateUser,
  createUser,
  deleteUser,
};
