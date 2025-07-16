export interface FeedbackInManager {
  id: string;
  userId: string | null;
  isAnonymous: boolean | null;
  generalExperienceRating: number | null;
  likedMost: string | null;
  suggestionForImprovement: string | null;
  relevanceRating: number | null;
  tipsQualityRating: number | null;
  aiAnalysisUsefulnessRating: number | null;
  extraSimulationTopic: string | null;
  contentUsabilityRating: number | null;
  missingContentType: string | null;
  selfLearning: string | null;
  confidenceContribution: string | null;
  featureIdea: string | null;
  systemDescriptionToFriend: string | null;
  fileUploadPath: string | null;
  is_anonymous: boolean 
  treatmentStatus: "Tested" | "In treatment" | "Treated";
  createdat: string;
}
