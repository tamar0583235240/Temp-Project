import { pool } from "../config/dbConnection";
import { Users } from "../interfaces/entities/Users";
import { User } from "../interfaces/User";
import bcrypt, { hash } from "bcrypt";

const SALT_ROUNDS = 10;

// קבלת משתמש לפי אימייל בלבד
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 LIMIT 1",
      [email]
    );
    return result.rows[0] || null;
  } catch {
    throw new Error("User not found");
  }
};

// קבלת כל המשתמשים
const getAllUsers = async (): Promise<Users[]> => {
  try {
    const res = await pool.query("SELECT * FROM users");
    return res.rows as Users[];
  } catch (error) {
    console.error("Error fetching users from local DB:", error);
    throw error;
  }
};

// קבלת משתמש לפי מזהה
const getUserById = async (id: string): Promise<Users | null> => {
  try {
    const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows[0] || null;
  } catch (error) {
    console.error("Error fetching user by ID from local DB:", error);
    throw error;
  }
};

// קבלת משתמש לפי אימייל וסיסמה
export const getUserByEmailAndPassword = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    const a = "rivka123";
    const hash = "$2b$10$LGl9guHZZheSoOKeb7vN4O6wgv2gFo3uSGVaaEZ7nZ6W7okfyMN2K";

    bcrypt.compare(a, hash).then((res) => {
      console.log("Compare result:", res); // אמור להדפיס true
    });

    if (!user) throw new Error("Invalid credentials");

    console.log("Password:", password);
    console.log("User from DB:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Is match:", isMatch);

    if (!isMatch) throw new Error("Invalid credentials");

    return user;
  } catch {
    throw new Error("User not found");
  }
};

// עדכון סיסמה
export const updateUserPassword = async (
  userId: string,
  newPassword: string
) => {
  await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
    newPassword,
    userId,
  ]);
};

// עדכון פרטי משתמש
const updateUser = async (
  id: string,
  userData: Partial<Users>
): Promise<Users | null> => {
  try {
    const { firstName, lastName, email, phone, role, isActive, password } =
      userData;

    const res = await pool.query(
      `
            UPDATE users 
            SET first_name = $1, last_name = $2, email = $3, phone = $4, role = $5, is_active = $6, password = COALESCE($7, password)
            WHERE id = $8 RETURNING *`,
      [firstName, lastName, email, phone, role, isActive, password, id]
    );
    return res.rows[0] || null;
  } catch (error) {
    console.error("Error updating user in local DB:", error);
    throw error;
  }
};

// יצירת משתמש חדש
const createUser = async (user: Users): Promise<Users> => {
  try {
    if (!user.password) {
      throw new Error("Password is required to create a user");
    }
    const res = await pool.query(
      `INSERT INTO users (id, first_name, last_name, email, phone, role, created_at, is_active, password)
             VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), $6, $7)
             RETURNING *`,
      [
        user.firstName,
        user.lastName,
        user.email,
        user.phone,
        user.role,
        user.isActive ?? true,
        user.password,
      ]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error creating user in local DB:", error);
    throw error;
  }
};

const insertUser = async (user: {
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

// מחיקת משתמש
const deleteUser = async (id: string): Promise<void> => {
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
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
  updateUserPassword,
  updateUser,
  createUser,
  insertUser,
  deleteUser,
};
