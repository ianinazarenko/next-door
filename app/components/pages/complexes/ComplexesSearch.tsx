'use client';

import { PAGES } from '@/utils/data/pages';
import { EComplexesParams } from '@/utils/constants/complexes';
import { ChangeEvent, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import CInput from '@/app/components/ui/CInput';

export default function ComplexesSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const urlSearch = searchParams.get(EComplexesParams.Search) ?? '';
    const [value, setValue] = useState(() => urlSearch);

    const debouncedSearch = useDebouncedCallback((search: string) => {
        const params = new URLSearchParams(searchParams);
        if (Boolean(search.trim())) {
            params.set(EComplexesParams.Search, search);
        } else {
            params.delete(EComplexesParams.Search);
        }

        startTransition(() => {
            router.replace(`${PAGES.COMPLEXES.link}?${params.toString()}`);
        });
    }, 700);

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const value = e.target.value || '';
        debouncedSearch(value);
        setValue(() => value);
    }

    return (
        <div className='relative'>
            <CInput
                value={value}
                placeholder='Search complexes...'
                onChange={handleChange}
            />

            {isPending && <span className='absolute top-1/2 right-4 -translate-y-1/2'>⏳</span>}
        </div>
    );
}
