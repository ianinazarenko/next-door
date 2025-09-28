'use client';

import { DEFAULT_VALUES, FIELDS } from '@/utils/data/new-post-form';
import { EFormStatus } from '@/utils/constants/forms';

import { TSchema } from '@/types/forms';
import { ISpec } from '@/types/common';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostSchema } from '@/utils/validation/schemas';

import { createPostAction } from '@/lib/actions/create-post';

import s from './NewPostForm.module.css';

import CButton from '@/app/components/ui/CButton';
import FormField from '@/app/components/common/form/FormField';
import NewPostFormStatus from '@/app/components/pages/posts-new/form/NewPostFormStatus';
import { PulseLoader } from 'react-spinners';

type TSpecTypes = Extract<keyof TSchema, 'category' | 'complex'>;
interface IProps {
    specs: Record<TSpecTypes, ISpec[]>;
}

const isSpecType = (key: string): key is TSpecTypes => {
    return key === 'category' || key === 'complex';
};

export default function NewPostForm({ specs }: IProps) {
    const [status, setStatus] = useState<EFormStatus>(EFormStatus.Idle);

    const defaultValues = {
        ...DEFAULT_VALUES,
        category: specs.category[0]?.value.toString() || '',
        complex: specs.complex[0]?.value.toString() || '',
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TSchema>({
        resolver: zodResolver(createPostSchema),
        mode: 'onTouched',
        defaultValues,
    });

    function resetForm() {
        reset(defaultValues);
        setStatus(EFormStatus.Idle);
    }

    async function onSubmit(data: TSchema) {
        setStatus(EFormStatus.Loading);
        try {
            await createPostAction(data);
            setStatus(EFormStatus.Success);
        } catch (error) {
            setStatus(EFormStatus.Error);
            console.warn('[NewPostForm / onSubmit] Error creating post:', error);
        }
    }

    return (
        <section className={'section'}>
            {/* FORM STATUSES */}
            {(status === EFormStatus.Success || status === EFormStatus.Error) && (
                <NewPostFormStatus
                    status={status}
                    resetForm={resetForm}
                />
            )}

            {/* FORM */}
            {[EFormStatus.Idle, EFormStatus.Loading].includes(status) && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={s.form}
                >
                    {FIELDS.map(
                        ({ is: Component, className, ...f }) =>
                            (!isSpecType(f.name) || specs[f.name].length > 0) && (
                                <FormField
                                    key={f.name}
                                    error={errors[f.name]?.message || ''}
                                    className={className && s[className]}
                                >
                                    <Component
                                        {...{ ...f, ...register(f.name) }}
                                        {...(isSpecType(f.name) ? { specs: specs[f.name] } : {})}
                                        disabled={status === EFormStatus.Loading}
                                    />
                                </FormField>
                            )
                    )}

                    <div className={s.row}>
                        <CButton
                            type='submit'
                            disabled={status === EFormStatus.Loading}
                        >
                            Publish
                        </CButton>
                    </div>

                    {status === EFormStatus.Loading && (
                        <div className={s.loader}>
                            <PulseLoader />
                        </div>
                    )}
                </form>
            )}
        </section>
    );
}
