import type { IComplexBase } from '@/types/complexes';
import type { IPostBase } from '@/types/posts';
import type { ERole } from '@/utils/constants/users';

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
