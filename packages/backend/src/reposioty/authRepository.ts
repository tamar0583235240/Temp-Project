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
    const res = await pool.query('INSERT INTO users SET ?', [userData]);
    return (res.rows[0] as Users) || null;
  } catch (error) {
    console.error("Error creating user in local DB:", error);
    throw error;
  }
};

export default { login , signup };
