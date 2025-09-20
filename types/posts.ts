import { ICategory } from '@/types/categories';
import { IComplexBase } from '@/types/complexes';
import { IComment } from '@/types/comments';

// Base interface for posts
export interface IPostBase {
    id: number;
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
    comments: IComment[];
    updatedAt: Date;
    complex: IComplexBase; // check what data is needed here
    category: ICategory;
}

// Posts State for Posts page
export interface IPostsState {
    complex: string;
    category: string;
}

// Where params for query
export interface IPostsWhereParams {
    categorySlug?: string;
    complexSlug?: string;
}
