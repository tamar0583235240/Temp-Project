export interface FeedbackToSystem {
    id: string
    general_experience_rating: number
    liked_most: string
    suggestion_for_improvement: string,
    relevance_rating:number,
    tips_quality_rating: number,
    ai_analysis_usefulness_rating:number,
    extra_simulation_topic:string,
    content_usability_rating:number,
    missing_content_type:string,
    self_learning:string,
    confidence_contribution: string,
    feature_idea: string,
    system_description_to_friend: string,
    file_upload_path: string,
    is_anonymous: boolean,
    user_id: string | null,
    treatment_status: treatment_status,
    createdat:string
}

export enum treatment_status {
    Tested = "Tested",
    InTreatment = "InTreatment",
    Treated = "Treated"
  }
  