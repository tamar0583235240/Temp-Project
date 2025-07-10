export interface ProgressData {
  first_name: string;
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