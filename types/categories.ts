import { IPostFull } from '@/types/posts';

export interface ICategory {
    id: string;
    slug: string;
    name: string;
}

export interface ICategoryWithPosts extends ICategory {
    posts: IPostFull[];
}
