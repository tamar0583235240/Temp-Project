export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  token: string;
  password: string;
}

export interface ResetFormData  {
  password: string;
  confirm: string;
};
