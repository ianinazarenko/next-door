'use client';

import { PAGES } from '@/utils/data/pages';
import { EPostsParams } from '@/utils/constants/posts';
import { ISpec } from '@/types/common';
import { IPostsState } from '@/types/posts';
import { ChangeEvent, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CSelect from '@/app/components/ui/CSelect';

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
        updateQuery(name, value);
    }

    function updateQuery(name: string, value: string) {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }

        startTransition(() => {
            router.replace(`${PAGES.POSTS.link}?${params.toString()}`);
        });
    }

    return (
        <section>
            {Boolean(specs.complex?.length) && (
                <CSelect
                    value={filters.complex}
                    specs={specs.complex}
                    name={EPostsParams.Complex}
                    disabled={isPending}
                    onChange={handleChange}
                />
            )}

            {Boolean(specs.category?.length) && (
                <CSelect
                    value={filters.category}
                    specs={specs.category}
                    name={EPostsParams.Category}
                    disabled={isPending}
                    onChange={handleChange}
                />
            )}
        </section>
    );
}
