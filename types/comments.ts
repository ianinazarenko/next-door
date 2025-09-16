export interface IComment {
    id: string;
    author: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    postId: number;
}
