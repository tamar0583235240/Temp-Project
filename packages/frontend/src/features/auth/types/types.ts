export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: 'student' | 'manager';
  create_dat: string;
  isactive: boolean;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  token: string;
  password: string;
}

export type ResetFormData = {
  password: string;
  confirm: string;
};
