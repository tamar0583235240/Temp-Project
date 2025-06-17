export interface feedbackType {
    id: string
    sharedRecordingId: string
    given_by_user_id: string
    comment: string
    rating: number | undefined
    created_at: Date
}