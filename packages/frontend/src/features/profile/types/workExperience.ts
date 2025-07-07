export interface WorkExperience {
  id: string;
  userId: string;
  companyName: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}
