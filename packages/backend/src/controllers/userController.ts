// import { Request, Response } from 'express';
// import {pool} from '../config/dbConnection'; // חיבור למסד הנתונים
// import { v4 as uuidv4 } from 'uuid';

// // ממיר שורות DB (camelCase) ל־camelCase בקוד
// function mapUserRowToCamelCase(row: any) {
//   return {
//     id: row.id,
//     firstName: row.firstName,
//     lastName: row.lastName,
//     email: row.email,
//     phone: row.phone,
//     role: row.role,
//     createdAt: row.createdAt,
//     isActive: row.isActive,
//   };
// }

// // קבלת כל המשתמשים
// export async function getAllUsers(req: Request, res: Response): Promise<void> {
//   try {
//     const result = await pool.query("SELECT * FROM users");
//     const users = result.rows.map(mapUserRowToCamelCase);
//     res.status(200).json(users);
//   } catch (err) {
//     console.error('שגיאה בקבלת כל המשתמשים:', err);
//     res.status(500).json({ error: 'אירעה שגיאה בעת טעינת המשתמשים' });
//   }
// }

// // עדכון משתמש לפי ID
// export async function updateUser(req: Request, res: Response): Promise<void> {
//   try {
//     const { id } = req.params;
//     const { firstName, lastName, email, phone, role } = req.body;

//     const result = await pool.query(
//       `UPDATE users SET 
//         "firstName" = $1,
//         "lastName" = $2,
//         email = $3,
//         phone = $4,
//         role = $5
//        WHERE id = $6
//        RETURNING *`,
//       [firstName, lastName, email, phone, role, id]
//     );

//     if (result.rowCount === 0) {
//       res.status(404).json({ error: 'משתמש לא נמצא' });
//       return;
//     }


//   const updatedUser = mapUserRowToCamelCase(result.rows[0]);
//   res.status(200).json(updatedUser);
// } catch (err) {
//   console.error('שגיאה בעדכון משתמש:', err);
//   res.status(500).json({ error: 'אירעה שגיאה בעת עדכון המשתמש' });
// }
// }

// // יצירת משתמש חדש
// export async function createUser(req: Request, res: Response): Promise<void> {
//   try {
//     const { firstName, lastName, email, phone, role } = req.body;
//     const id = uuidv4();
//     const createdAt = new Date().toISOString();
//     const isActive = true;

// const result = await pool.query(
//   `INSERT INTO users (id, "firstName", "lastName", email, phone, role, "createdAt", "isActive")
//    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//    RETURNING *`,
//   [id, firstName, lastName, email, phone, role, createdAt, isActive]
//   );

//     const newUser = mapUserRowToCamelCase(result.rows[0]);
//     res.status(201).json(newUser);

//   } catch (err) {
//     console.error('שגיאה ביצירת משתמש:', err);
//     res.status(500).json({ error: 'אירעה שגיאה בעת יצירת המשתמש' });
//   }
// }

// // מחיקת משתמש לפי ID
// export async function deleteUser(req: Request, res: Response): Promise<void> {
//   try {
//     const { id } = req.params;

//     const result = await pool.query(
//       'DELETE FROM users WHERE id = $1 RETURNING *;',
//       [id]
//     );

//     if (result.rowCount === 0) {
//       res.status(404).json({ error: 'משתמש לא נמצא' });
//       return;
//     }

//     res.status(200).json({ message: 'המשתמש נמחק בהצלחה' });

//   } catch (err) {
//     console.error('שגיאה במחיקת משתמש:', err);
//     res.status(500).json({ error: 'אירעה שגיאה בעת מחיקת המשתמש' });
//   }
// }


import { Request, Response } from 'express';
import { pool } from '../config/dbConnection';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { createUserSchema, updateUserSchema } from '../validations/userValidation'

function mapUserRowToCamelCase(row: any) {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    role: row.role,
    password: row.password, 
    createdAt: row.created_at,
    isActive: row.email && row.password ? true : false,
  };
}


export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, role, password } = req.body;
  const id = uuidv4();
  const createdAt = new Date();

  try {
    const validatedData = await createUserSchema.validate(req.body, { abortEarly: false });

    // שמירת הסיסמה כפי שהיא ללא הצפנה
    const result = await pool.query(
      `INSERT INTO users (id, first_name, last_name, email, phone, role, created_at, password)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [id, firstName, lastName, email, phone, role, createdAt, password]
    );

    res.status(201).json(mapUserRowToCamelCase(result.rows[0]));
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, role, password } = req.body;

  try {
        const validatedData = await updateUserSchema.validate(req.body, { abortEarly: false });

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

  try {
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
  } catch (error:any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    const users = result.rows.map(mapUserRowToCamelCase);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
