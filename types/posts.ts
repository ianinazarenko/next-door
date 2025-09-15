import { ICategory } from '@/types/categories';
import { IComplexFull } from '@/types/complexes';

// Base interface for posts
export interface IPostBase {
    id: string;
    title: string;
    shortText: string;
    authorName: string;
    image: string | null;
    deadline: Date | null;
    createdAt: Date;
    complexSlug: string;
    categorySlug: string;
}

// Posts page post-item
export interface IPostListItem extends IPostBase {
    category: ICategory;
    commentsCount: number;
}

// Post detail page post-data
export interface IPostFull extends IPostBase {
    fullText: string;
    phone: string | null;
    whatsapp: string | null;
    comments: Comment[];
    updatedAt: Date;
    complex: IComplexFull; // check what data is needed here
    category: ICategory;
}
