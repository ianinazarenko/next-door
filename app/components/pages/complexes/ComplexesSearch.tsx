'use client';

import { PAGES } from '@/utils/data/pages';
import { ChangeEvent, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import CInput from '@/app/components/ui/CInput';

export default function ComplexesSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const debouncedSearch = useDebouncedCallback((search: string) => {
        const params = new URLSearchParams(searchParams);
        if (Boolean(search.trim())) {
            params.set('search', search);
        } else {
            params.delete('search');
        }

        startTransition(() => {
            router.replace(`${PAGES.COMPLEXES.link}?${params.toString()}`);
        });
    }, 500);

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const value = e.target.value || '';
        debouncedSearch(value);
    }

    return (
        <div className='relative'>
            <CInput
                placeholder='Search complexes...'
                onChange={handleChange}
            />

            {isPending && <span className='absolute top-1/2 right-4 -translate-y-1/2'>⏳</span>}
        </div>
    );
}
