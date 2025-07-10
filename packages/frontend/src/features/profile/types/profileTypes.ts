export type ProfileStatus = 'Available' | 'Not Available';
export type JobType = 'Full-time' | 'Part-time' | 'Freelance' | 'Internship' | 'Any';

export type ExternalLink = string | { url: string; label?: string };

export interface Profile {
  id: string;
  full_name: string;
  image_url?: string;
  location?: string;
  external_links?: ExternalLink[]; 
  status: ProfileStatus;
  preferred_job_type: JobType;
  created_at: string;
  updated_at: string;
  is_public?: boolean;
}
