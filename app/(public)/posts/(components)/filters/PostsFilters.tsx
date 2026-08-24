'use client';
// Constants
import { RESET_BUTTON_TEXT, COMPLEX_ARIA_LABEL, CATEGORY_ARIA_LABEL } from '@/data/posts-filters';
// Types
import { EPostsParams } from '@/utils/constants/posts';
import { ISpec } from '@/types/common';
// Utils
import clsx from 'clsx';
// Hooks
import { ChangeEvent, useTransition } from 'react';
import { useQueryState } from 'nuqs';
// Components
import CSelect from '@/ui/atoms/CSelect';
import CButton from '@/ui/atoms/CButton';
// Styles
import s from './PostsFilters.module.css';

interface IProps {
    specs: {
        complex: ISpec[];
        category: ISpec[];
    };
}

export default function PostsFilters({ specs }: IProps) {
    const [isPending, startTransition] = useTransition();

    const [complex, setComplex] = useQueryState(EPostsParams.Complex, {
        shallow: false,
        defaultValue: '',
        startTransition,
    });

    const [category, setCategory] = useQueryState(EPostsParams.Category, {
        shallow: false,
        defaultValue: '',
        startTransition,
    });

    const isBtnDisabled = (!complex && !category) || isPending;

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const { value, name } = e.target;

        if (name === EPostsParams.Complex) {
            setComplex(value);
        } else {
            setCategory(value);
        }
    }

    function handleReset() {
        setComplex(null);
        setCategory(null);
    }

    return (
        <section className={clsx(s.filters, 'content-fade-in')}>
            {Boolean(specs.complex?.length) && (
                <CSelect
                    value={complex}
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
                    value={category}
                    specs={specs.category}
                    name={EPostsParams.Category}
                    disabled={isPending}
                    className={s.select}
                    ariaLabel={CATEGORY_ARIA_LABEL}
                    onChange={handleChange}
                />
            )}

            <CButton
                disabled={isBtnDisabled}
                className={s.button}
                isLoading={isPending}
                onClick={handleReset}
            >
                {RESET_BUTTON_TEXT}
            </CButton>
        </section>
    );
}
