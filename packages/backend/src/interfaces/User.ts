export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string|undefined;
    role: 'student' | 'manager';
    createdAt: Date;
    isActive: boolean;
}