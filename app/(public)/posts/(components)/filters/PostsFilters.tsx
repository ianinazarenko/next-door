'use client';

import { PAGES } from '@/data/pages';
import { RESET_BUTTON_TEXT, COMPLEX_ARIA_LABEL, CATEGORY_ARIA_LABEL } from '@/data/posts-filters';
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
            const query = params.toString();
            router.replace(query ? `${PAGES.POSTS.link}?${query}` : PAGES.POSTS.link);
        });
    }

    function handleReset() {
        setFilters(() => ({ complex: '', category: '' }));
        router.replace(PAGES.POSTS.link);
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
                    ariaLabel={COMPLEX_ARIA_LABEL}
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
                    ariaLabel={CATEGORY_ARIA_LABEL}
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
