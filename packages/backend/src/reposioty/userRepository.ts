import { client } from '../config/dbConnection';
import { User } from "../interfaces/User";

// הבאת כל המשתמשים
const getAllUserss = async (): Promise<User[]> => {
  try {
    const res = await client.query('SELECT * FROM users');
    return res.rows as User[];
  } catch (error) {
    console.error("Error fetching users from local DB:", error);
    throw error;
  }
};

// הבאת משתמש לפי ID
const getUserById = async (id: string): Promise<User | null> => {
  try {
    const res = await client.query('SELECT * FROM users WHERE id = $1', [id]);
    return (res.rows[0] as User) || null;
  } catch (error) {
    console.error("Error fetching user by ID from local DB:", error);
    throw error;
  }
};

export default { getAllUserss, getUserById };
