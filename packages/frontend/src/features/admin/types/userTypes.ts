import { User } from "../../../../../backend/src/interfaces/User";

export interface user extends User {
  isSelected?: boolean; // שדה פנימי לצרכי UI בלבד
}

export interface UserFormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // הפוך ל-string חובה, גם אם ריק
  password: string;
  role: 'student' | 'manager';
}
