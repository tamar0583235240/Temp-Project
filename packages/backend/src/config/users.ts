import { User } from '../interfaces/User';

export const users: User[] = [
  {
    id: '1',
    firstName: 'Rachel',
    lastName: 'Levi',
    email: 'rachel@example.com',
    phone: '0501234567',
    role: 'manager',
    createdAt: new Date(),
    isActive: true,
    password:"123"
  },
  {
    id: '2',
    firstName: 'Tamar',
    lastName: 'Cohen',
    email: 'tamar@example.com',
    phone: '0527654321',
    role: 'student',
    createdAt: new Date(),
    isActive: true,
    password:"345"
  },
];
