import { baseUrl } from '@/utils/constants/base-url';

export function getSafeCallbackUrl(callbackUrl: string | undefined, fallback: string): string {
    if (!callbackUrl) {
        return fallback;
    }

    if (callbackUrl.startsWith('/') && !callbackUrl.startsWith('//')) {
        return callbackUrl;
    }

    try {
        const targetUrl = new URL(callbackUrl);
        const appUrl = new URL(baseUrl);
        return targetUrl.origin === appUrl.origin ? targetUrl.pathname + targetUrl.search : fallback;
    } catch {
        return fallback;
    }
}

/**
 * Returns the first search param value when it can be a string or array
 * @param value - Search param value from Next.js (string, array, or undefined)
 * @returns First value if array, original string, or undefined
 */
export function getSearchParamValue(value: string | string[] | undefined): string | undefined {
    if (Array.isArray(value)) {
        return value[0];
    }

    return value;
}

/**
 * Returns all search param values as an array
 * @param value - Search param value from Next.js (string, array, or undefined)
 * @returns Array of values (empty when undefined)
 */
export function getSearchParamValues(value: string | string[] | undefined): string[] {
    if (!value) {
        return [];
    }

    return Array.isArray(value) ? value : [value];
}
