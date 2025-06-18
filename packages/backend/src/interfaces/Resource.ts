export interface Resource {
    id: string
    title: string
    type: 'pdf' | 'text' | 'link'
    description: string
    fileUrl: string
    createdAt: Date

}