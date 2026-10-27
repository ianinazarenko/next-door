'use client';

import type { ChangeEvent} from 'react';

import { debounce,useQueryState } from 'nuqs';
import { useTransition } from 'react';
import { PulseLoader } from 'react-spinners';

import CInput from '@/ui/atoms/CInput';
import { EComplexesParams } from '@/utils/constants/complexes';

import s from './ComplexesSearch.module.css';

export default function ComplexesSearch() {
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useQueryState(EComplexesParams.Search, {
        shallow: false,
        defaultValue: '',
        clearOnDefault: true,
        limitUrlUpdates: debounce(700),
        startTransition
    })

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const value = e.target.value || null;
        setSearch(value);
    }

    return (
        <div className={s.container}>
            <CInput
                value={search || ''}
                placeholder='Search complexes...'
                onChange={handleChange}
            />

            {isPending && (
                <PulseLoader
                    className={s.loader}
                    color={'var(--text-primary)'}
                    size={8}
                />
            )}
        </div>
    );
}
