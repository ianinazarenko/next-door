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
