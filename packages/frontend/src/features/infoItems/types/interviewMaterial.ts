export interface InterviewMaterial {
  id: string;
  title: string;
  short_description: string;
  thumbnail: string | null;
  file_url: string | null;
  created_at?: string;
}