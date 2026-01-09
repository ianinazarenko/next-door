export interface IAuthSearchParams {
    callbackUrl?: string | string[];
    error?: string | string[];
    [k: string]: string | string[] | undefined;
}
