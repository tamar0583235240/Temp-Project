export interface interviewExperiences{

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
}