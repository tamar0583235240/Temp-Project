export interface interviewExperiences {

  id: string;

  company_name: string;

  position: string;

  interviewDate: string | null;

  questions: string | null;

  tips: string | null;

  description: string | null;

  hired: boolean | null;

  rating: number | null;

  anonymous: boolean | null;

  created_at: Date | null;

  user_id: string | null;

  first_name:string | null,

  last_name: string | null,

  email: string | null,

  phone: string | null,

  role: string | null,

  is_active: boolean | null,

  password: string | null,
  
  slug: string | null
}