import { Request, Response } from 'express';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const tempDir = path.join(process.cwd(), 'temp_code');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

export const runCode = async (req: Request, res: Response) => {
  const { language, code } = req.body;
  if (!language || !code) {
    return res.status(400).json({ message: 'שפה או קוד חסרים' });
  }

type Language = 'java' | 'python' | 'c' | 'cpp' | 'c++' | 'c#';

const fileNames: Record<Language, string> = {
  'java': 'Main.java',
  'python': 'script.py',
  'c': 'main.c',
  'cpp': 'main.cpp',
  'c++': 'main.cpp',
  'c#': 'Program.cs',
};

const languageLower = (language as string).toLowerCase() as Language;
const fileName = fileNames[languageLower];


  if (!fileName) {
    return res.status(400).json({ message: 'שפה לא נתמכת' });
  }

  const filePath = path.join(tempDir, fileName);
  fs.writeFileSync(filePath, code);

  let command = '';

  switch (language.toLowerCase()) {
    case 'java':
      command = `javac ${fileName} && java Main`;
      break;
    case 'python':
      command = `python3 ${fileName}`;
      break;
    case 'c':
      command = `gcc ${fileName} -o main && ./main`;
      break;
    case 'cpp':
    case 'c++':
      command = `g++ ${fileName} -o main && ./main`;
      break;
    case 'c#':
      command = `dotnet run --project ${filePath}`;
      break;
    default:
      return res.status(400).json({ message: 'שפה לא נתמכת' });
  }

  exec(command, { cwd: tempDir }, (error, stdout, stderr) => {
    if (error) {
      return res.json({ success: false, error: stderr || error.message });
    }
    res.json({ success: true, output: stdout });
  });
};
