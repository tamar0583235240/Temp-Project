import { pool } from '../config/dbConnection';
import { Users } from "../interfaces/entities/Users";

const login = async (email:string, password: string): Promise<Users|null> => {
  try {
    const res = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    return (res.rows[0] as Users) || null;
  } catch (error) {
    console.error("Error logging in from local DB:", error);
    throw error;
  }
};

const signup = async (userData: Users): Promise<Users> => {
  try {
    const { id, firstName, lastName, email, phone, role, createdAt, isActive } = userData;

    const res = await pool.query(
      `INSERT INTO users (id, first_name, last_name, email, phone, role, created_at, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [id, firstName, lastName, email, phone, role, createdAt, isActive]
    );

    return (res.rows[0] as Users) || null;
  } catch (error) {
    console.error("Error creating user in local DB:", error);
    throw error;
  }
};

export default { login , signup };
