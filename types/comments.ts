import { IUserBase } from '@/types/users';

export interface IComment {
    id: string;
    author: IUserBase;
    authorId: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    postId: number;
}
