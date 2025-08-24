import { Post } from './posts';

export interface IComplexBase {
    id: string;
    name: string;
    slug: string;
    address: string | null;
}

export interface IComplexFull extends IComplexBase {
    metro: string | null;
    description: string | null;
    timeToMetro: string | null;
    posts: Post[] | null;
}
