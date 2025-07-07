export interface ProgressData {
  firstName: string;
  lastName: string;
  email: string;
  percent: number;
  answered: number;
  total: number;
  weakAreas: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: 'student' | 'manager';
  createdAt: string;
  isActive: boolean;
}