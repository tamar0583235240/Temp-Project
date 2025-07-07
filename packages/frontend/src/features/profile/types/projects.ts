export type PersonalProject = {
    id: number;
    userId: string; 
    title: string;
    description?: string | null;
    demoUrl?: string | null;
    codeUrl?: string | null;
    thumbnailUrl?: string | null;
    tags?: string[] | null;
    status?: string | null;
    isPublic?: boolean | null;
    createdAt?: string | null;
    updatedAt?: string | null;
}