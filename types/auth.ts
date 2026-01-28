import { ReactNode } from 'react';

export interface IAuthSearchParams {
    callbackUrl?: string | string[];
    error?: string | string[];
    [k: string]: string | string[] | undefined;
}

export interface GitHubEmail {
    email: string;
    primary: boolean;
    verified: boolean;
    visibility: string | null;
}

export interface IProvider {
    icon: ReactNode;
    name: string;
}
