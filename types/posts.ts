export interface Post {
    id: string;
    title: string;
    shortText: string;
    fullText: string;
    authorName: string;
    phone: string | null;
    whatsapp: string | null;
    image: string | null;
    deadline: Date | null;
    createdAt: Date;
    updatedAt: Date;
    complexId: string;
    categorySlug: string;
}
