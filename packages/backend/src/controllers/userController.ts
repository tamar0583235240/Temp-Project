// import { Request, Response } from 'express';
// import fs from 'fs';
// import path from 'path';
// import pool from '../config/pgClient'; // מניח שאת משתמשת בקובץ pgClient.ts

// const usersPath = path.join(__dirname, '../data/users.json');

// // פונקציית עזר לקריאת קובץ
// function readUsersFile(): any[] {
//   try {
//     const raw = fs.readFileSync(usersPath, 'utf-8');
//     return JSON.parse(raw);
//   } catch (err) {
//     console.error('שגיאה בקריאת קובץ המשתמשים:', err);
//     return [];
//   }
// }

// // פונקציית עזר לכתיבת קובץ
// function writeUsersFile(users: any[]) {
//   try {
//     fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
//   } catch (err) {
//     console.error('שגיאה בכתיבת קובץ המשתמשים:', err);
//   }
// }

// // קבלת כל המשתמשים
// export function getAllUsers(req: Request, res: Response): void {
//   try {
//     const users = readUsersFile();
//     res.status(200).json(users);
//   } catch (err) {
//     console.error('שגיאה בקבלת כל המשתמשים:', err);
//     res.status(500).json({ error: 'אירעה שגיאה בעת טעינת המשתמשים' });
//   }
// }

// // עדכון משתמש לפי ID
// export function updateUser(req: Request, res: Response): void {
//   try {
//     const { id } = req.params;
//     const users = readUsersFile();
//     const index = users.findIndex(user => user.id === id);

//     if (index === -1) {
//       res.status(404).json({ error: 'משתמש לא נמצא' });
//     } else {
//       users[index] = {
//         ...users[index],
//         ...req.body,
//         updatedAt: new Date().toISOString()
//       };
//       writeUsersFile(users);
//       res.status(200).json(users[index]);
//     }
//   } catch (err) {
//     console.error('שגיאה בעדכון משתמש:', err);
//     res.status(500).json({ error: 'אירעה שגיאה בעת עדכון המשתמש' });
//   }
// }

// // מחיקת משתמש לפי ID
// export function deleteUser(req: Request, res: Response): void {
//   try {
//     const { id } = req.params;
//     const users = readUsersFile();
//     const filtered = users.filter(user => user.id !== id);

//     if (filtered.length === users.length) {
//       res.status(404).json({ error: 'משתמש לא נמצא' });
//     } else {
//       writeUsersFile(filtered);
//       res.status(200).json({ message: 'המשתמש נמחק בהצלחה' });
//     }
//   } catch (err) {
//     console.error('שגיאה במחיקת משתמש:', err);
//     res.status(500).json({ error: 'אירעה שגיאה בעת מחיקת המשתמש' });
//   }
// }
import { Request, Response } from 'express';
import pool from '../config/dbConnection'; // חיבור למסד הנתונים

// ממיר שורות DB (snake_case) ל-camelCase
function mapUserRowToCamelCase(row: any) {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    role: row.role,
    createdAt: row.created_at,
    isActive: row.is_active,
  };
}

// קבלת כל המשתמשים
export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const result = await pool.query("SELECT * FROM users");
    const users = result.rows.map(mapUserRowToCamelCase);
    res.status(200).json(users);
  } catch (err) {
    console.error('שגיאה בקבלת כל המשתמשים:', err);
    res.status(500).json({ error: 'אירעה שגיאה בעת טעינת המשתמשים' });
  }
}

// עדכון משתמש לפי ID
export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, role } = req.body;

    const result = await pool.query(
      `UPDATE users SET 
        first_name = $1,
        last_name = $2,
        email = $3,
        phone = $4,
        role = $5
       WHERE id = $6
       RETURNING *`,
      [firstName, lastName, email, phone, role, id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'משתמש לא נמצא' });
      return;
    }

    const updatedUser = mapUserRowToCamelCase(result.rows[0]);
    res.status(200).json(updatedUser);

  } catch (err) {
    console.error('שגיאה בעדכון משתמש:', err);
    res.status(500).json({ error: 'אירעה שגיאה בעת עדכון המשתמש' });
  }
}

// מחיקת משתמש לפי ID
export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *;',
      [id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'משתמש לא נמצא' });
      return;
    }

    res.status(200).json({ message: 'המשתמש נמחק בהצלחה' });

  } catch (err) {
    console.error('שגיאה במחיקת משתמש:', err);
    res.status(500).json({ error: 'אירעה שגיאה בעת מחיקת המשתמש' });
  }
}
