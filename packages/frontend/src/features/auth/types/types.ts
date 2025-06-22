export interface User {
  id: string;
  // firstName: string;
  // lastName: string;
  email: string;
  password: string;
  phone?: string;
  role: 'student' | 'manager';
  createdAt: string; // מתורגם מתאריך
  isActive: boolean;
  first_name: string;
  last_name: string;
}
