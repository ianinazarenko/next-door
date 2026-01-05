export function getSafeCallbackUrl(callbackUrl: string | undefined, fallback: string): string {
    if (!callbackUrl) {
        return fallback;
    }

    if (callbackUrl.startsWith('/') && !callbackUrl.startsWith('//')) {
        return callbackUrl;
    }

    return fallback;
}
