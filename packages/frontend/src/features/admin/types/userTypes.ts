// src/features/admin/types/userTypes.ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'student' | 'manager' | 'admin';
  createdAt: string;
  isActive: boolean;
}
