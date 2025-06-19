export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'student' | 'manager';
  createdAt: string;
  isActive: boolean;
}