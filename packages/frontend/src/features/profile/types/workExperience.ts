export interface WorkExperience {
  id: string;
  userId: string;
  companyName: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  is_public: boolean;
  createdAt: string;
  updatedAt: string;
}
