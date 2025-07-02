import { pool } from '../config/dbConnection';
import { Users } from "../interfaces/entities/Users";

const login = async (email: string): Promise<Users | null> => {
  try {
    const res = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
    const user = res.rows[0];
    if (!user) return null;
    return user as Users;
  } catch (error) {
    console.error("Error fetching user from DB:", error);
    throw error;
  }
};

const signup = async (userData: Users): Promise<Users> => {
  try {
    const { id, first_name, last_name, email, phone, role, createdAt, isActive, password} = userData;

    const res = await pool.query(
      `INSERT INTO users (id, first_name, last_name, email, phone, role, created_at, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [id, first_name, last_name, email, phone, role, createdAt, isActive, password]
    );

    return (res.rows[0] as Users) || null;
  } catch (error) {
    console.error("Error creating user in DB:", error);
    throw error;
  }
};

export default { login, signup };
