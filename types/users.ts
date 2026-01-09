import { ERole } from '@/utils/constants/users';
import { IComplexBase } from '@/types/complexes';
import { IPostBase } from '@/types/posts';

export interface IUserBase {
    id: string;
    name: string | null;
    image: string | null;
    phone: string | null;
    whatsapp: string | null;
}

export interface IUser extends IUserBase {
    email: string;
    role: ERole;
    complex: IComplexBase | null;
    posts: IPostBase[];
    createdAt: Date;
    complexId: string | null;
}
