'use client';

import CLinkButton from '@/ui/atoms/CLinkButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const BTN_LABEL = 'Back';
export default function BackButton({ backUrl }: { backUrl?: string }) {
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const router = useRouter();

    function handleBack() {
        if (backUrl) {
            router.push(backUrl);
        } else {
            router.back();
        }
    }
    return (
        <div
            role={'button'}
            tabIndex={0}
            className={'ml-[-1.6rem] inline-block px-4 py-4'}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handleBack}
        >
            <CLinkButton
                isHovering={isHovering}
                isLeft
            >
                {BTN_LABEL}
            </CLinkButton>
        </div>
    );
}
