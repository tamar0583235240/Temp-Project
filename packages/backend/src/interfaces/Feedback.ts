export interface Feedback {
    id: string
    sharedRecordingId: string
    givenByUserId: string
    comment: string
    rating: number | undefined
    createdAt: Date
}