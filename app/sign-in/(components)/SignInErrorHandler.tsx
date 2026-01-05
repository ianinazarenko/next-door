'use client';

import { ERROR_MESSAGES } from '@/utils/constants/auth';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function SignInErrorHandler() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (error) {
            const message = ERROR_MESSAGES[error] || ERROR_MESSAGES.Default;
            toast.error(message);

            const updatedParams = new URLSearchParams(searchParams.toString());
            updatedParams.delete('error');
            const queryString = updatedParams.toString();
            const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
            router.replace(newUrl);
        }
    }, [error, router, pathname, searchParams]);

    return null;
}
