'use client';

import { useEffect } from 'react';
import CButton from '@/app/components/ui/CButton';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const CODE = '500';
    const TEXT = 'Wow... something dramatically went wrong';
    const BTN = 'Try again';

    useEffect(() => {
        console.error(error);
    }, [error]);
    return (
        <div className={'page c-container flex flex-col items-center justify-center'}>
            <div className={'flex h-full flex-col items-center justify-center'}>
                <div className={'h1'}>{CODE}</div>
                <div className={'card-description'}>{TEXT}</div>

                <div className={'pt-4'}>
                    <CButton onClick={() => reset()}>{BTN}</CButton>
                </div>
            </div>
        </div>
    );
}
