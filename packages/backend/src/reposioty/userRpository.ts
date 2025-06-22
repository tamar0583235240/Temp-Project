import xlsx from 'xlsx';
import { pool } from '../config/dbConnection';
import { v4 as uuidv4 } from 'uuid';


export const insertUsersFromExcel = async (filePath: string) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // המרה ל-any[] כדי שהטיפוס יהיה ברור
  const jsonData: any[] = xlsx.utils.sheet_to_json(worksheet);

  // רשימה לשמירת המשתמשים שהוכנסו בהצלחה
  const insertedUsers: any[] = [];

 for (const userRaw of jsonData) {
  // ניקוי מפתחות ויצירת אובייקט חדש עם שמות נכונים
  const user: Record<string, any> = {};
  for (const key in userRaw) {
    user[key.trim()] = userRaw[key];
  }
  
    // כאן מיפוי השדות לפי שמות אמיתיים בקובץ שלך
  const firstName = user['שם פרטי'];
  const lastName = user['שם משתמש'] || user['שם משפחה']; // מוודא לפי שני השמות
  const email = user['אימייל']?.trim() || user['אימייל ']?.trim(); // מוודא רווח מיותר
  const phone = user['טלפון'];
  const role = user['תפקיד'];
  const password = user['סיסמא'] || user['סיסמה'];


  if (!firstName || !lastName || !email || !phone || !role || !password) {
    console.log('Missing required fields for user:', user);
    continue;
  }

    // הוספת משתמש למסד
    try {
      const id = uuidv4();
      const createdAt = new Date();
      const isActive = true; // ברירת מחדל

      const result = await pool.query(
        `INSERT INTO users
         (id,first_name, last_name, email, phone, role, created_at, is_active, password)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9)
         RETURNING *`,
        [id,firstName, lastName, email, phone, role, createdAt, isActive, password]
      );

      insertedUsers.push(result.rows[0]);
    } catch (err) {
      console.error('Error inserting user:', user, err);
    }
  }

  console.log('משתמשים שהועלו מהקובץ:', insertedUsers);
  return insertedUsers;
};

// פונקציה להמרת תאריך אקסל לתאריך JS (אם צריך)
function excelDateToJSDate(serial: number | undefined) {
  if (typeof serial !== 'number') return null;
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);
  return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate());
}
