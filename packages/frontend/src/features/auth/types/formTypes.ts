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
