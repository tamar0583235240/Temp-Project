import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { Response } from 'express';

const tempDir = path.join(process.cwd(), 'temp_code');

// יצירת תיקיית הקבצים הזמניים אם היא לא קיימת
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

/**
 * יוצר קובץ זמני עם הקוד שנשלח
 * @param fileName שם הקובץ (לדוגמה: Main.java)
 * @param code מחרוזת הקוד לכתיבה
 * @returns הנתיב המלא לקובץ
 */
export const writeTempFile = (fileName: string, code: string): string => {
  const filePath = path.join(tempDir, fileName);
  fs.writeFileSync(filePath, code);
  return filePath;
};

/**
 * מריץ פקודה במעטפת ומחזיר את התוצאה או השגיאה
 * @param command פקודה להרצה (לדוגמה: 'javac Main.java && java Main')
 * @param cwd תיקיית עבודה להרצה (ברירת מחדל: tempDir)
 * @returns Promise שמחזיר את הפלט או שגיאה
 */
export const execCommand = (command: string, cwd: string = tempDir): Promise<{ stdout: string; stderr: string }> => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};

/**
 * פונקציה כוללת להרצת קוד:
 * 1. כותבת קובץ זמני
 * 2. מריצה פקודת הרצה
 * 3. מחזירה תוצאה או שגיאה
 * @param fileName שם הקובץ
 * @param code מחרוזת הקוד
 * @param runCommand הפקודה להרצה
 * @param res תגובת Express לשליחה ללקוח
 */
export const runCode = async (
  fileName: string,
  code: string,
  runCommand: string,
  res: Response
) => {
  try {
    writeTempFile(fileName, code);
    const { stdout } = await execCommand(runCommand);
    res.json({ success: true, output: stdout });
  } catch (error) {
    res.json({ success: false, error: typeof error === 'string' ? error : 'שגיאה בהרצת הקוד' });
  }
};


// import fs from 'fs';
// import path from 'path';
// import { exec } from 'child_process';

// const tempDir = path.join(process.cwd(), 'temp_code');

// export const writeTempFile = (fileName: string, code: string): string => {
//   if (!fs.existsSync(tempDir)) {
//     fs.mkdirSync(tempDir, { recursive: true });
//   }
//   const filePath = path.join(tempDir, fileName);
//   fs.writeFileSync(filePath, code);
//   return filePath;
// };

// export const execCommand = (command: string, cwd: string): Promise<{ success: boolean; output: string }> => {
//   return new Promise((resolve) => {
//     exec(command, { cwd }, (error, stdout, stderr) => {
//       if (error) {
//         resolve({ success: false, output: stderr || error.message });
//       } else {
//         resolve({ success: true, output: stdout });
//       }
//     });
//   });
// };
