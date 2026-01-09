'use client';

import { PAGES } from '@/data/pages';
import { EPostsParams } from '@/utils/constants/posts';
import { ISpec } from '@/types/common';
import { IPostsState } from '@/types/posts';
import { ChangeEvent, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import s from './PostsFilters.module.css';
import CSelect from '@/ui/atoms/CSelect';
import CButton from '@/ui/atoms/CButton';

interface IProps {
    specs: {
        complex: ISpec[];
        category: ISpec[];
    };
}

const RESET_BUTTON_TEXT = 'Reset';

export default function PostsFilters({ specs }: IProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState<IPostsState>({
        complex: searchParams.get(EPostsParams.Complex) || '',
        category: searchParams.get(EPostsParams.Category) || '',
    });

    const [isPending, startTransition] = useTransition();

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const { value, name } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
        updateQuery({ [name]: value || '' });
    }

    function updateQuery(updates: Record<string, string>) {
        const params = new URLSearchParams(searchParams);

        Object.entries(updates).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        startTransition(() => {
            router.replace(`${PAGES.POSTS.link}?${params.toString()}`);
        });
    }

    function handleReset() {
        const resetVals = { complex: '', category: '' };
        setFilters(resetVals);
        updateQuery(resetVals);
    }

    return (
        <section className={s.filters}>
            {Boolean(specs.complex?.length) && (
                <CSelect
                    value={filters.complex}
                    specs={specs.complex}
                    name={EPostsParams.Complex}
                    disabled={isPending}
                    className={s.select}
                    ariaLabel={'Choose a complex to filter by'}
                    onChange={handleChange}
                />
            )}

            {Boolean(specs.category?.length) && (
                <CSelect
                    value={filters.category}
                    specs={specs.category}
                    name={EPostsParams.Category}
                    disabled={isPending}
                    className={s.select}
                    ariaLabel={'Choose a category to filter by'}
                    onChange={handleChange}
                />
            )}

            <CButton
                disabled={(!filters.complex && !filters.category) || isPending}
                className={s.button}
                isLoading={isPending}
                onClick={handleReset}
            >
                {RESET_BUTTON_TEXT}
            </CButton>
        </section>
    );
}
