import { IPostBase } from './posts';

export interface IComplexBase {
    id: string;
    name: string;
    slug: string;
    address: string | null;
}

export interface IUsefulPhone {
    id: string;
    name: string;
    number: string;
}

export interface IManagementCompany {
    id: string;
    name: string;
    slug: string;
    phone: string | null;
    email: string | null;
}

export interface IComplexFull extends IComplexBase {
    metro: string | null;
    description: string | null;
    timeToMetro: number | null;
    posts: IPostBase[];
    usefulPhones: IUsefulPhone[];
    managementCompany: IManagementCompany | null;
    phone: string | null;
    email: string | null;
}

export interface IComplexesState {
    search?: string;
}
