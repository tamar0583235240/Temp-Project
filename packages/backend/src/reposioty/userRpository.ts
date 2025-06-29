import xlsx from 'xlsx';
import { pool } from '../config/dbConnection';
import { v4 as uuidv4 } from 'uuid';

interface ExcelUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}

export const insertUsersFromExcel = async (filePath: string): Promise<{
  insertedUsers: ExcelUser[];
  skippedUsers: ExcelUser[];
}> => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data: ExcelUser[] = xlsx.utils.sheet_to_json(sheet);

  const insertedUsers: ExcelUser[] = [];
  const skippedUsers: ExcelUser[] = [];

  for (const user of data) {
    const { email, firstName, lastName, phone, role, password } = user;

    const emailCheck = await pool.query('SELECT id FROM users WHERE email = $1', [email]);

    if (emailCheck.rowCount && emailCheck.rowCount > 0) {
      skippedUsers.push(user);
      continue;
    }

    const id = uuidv4();
    const createdAt = new Date();

    await pool.query(
      `INSERT INTO users (id, first_name, last_name, email, phone, role, password, created_at, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false)`,
      [id, firstName, lastName, email, phone, role, password, createdAt]
    );

    insertedUsers.push(user);
  }

  return { insertedUsers, skippedUsers };
};
