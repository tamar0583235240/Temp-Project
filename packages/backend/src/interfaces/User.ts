export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string|undefined;
    role: 'student' | 'manager';
    createdAt: Date;
    isActive: boolean;
    password: string; // Optional, used only for creation
}