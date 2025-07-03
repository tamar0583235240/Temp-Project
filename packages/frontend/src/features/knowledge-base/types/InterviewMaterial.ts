export type InterviewMaterial = {
  id: number;
  title: string;
  thumbnail: string; // URL לתמונה מ-Supabase Storage
  short_description?: string; // שדה אופציונלי – יכול להיות null/undefined
  file_url: string; // קישור לקובץ
};