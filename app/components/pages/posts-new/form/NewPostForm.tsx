'use client';

import { DEFAULT_VALUES, FIELDS } from '@/utils/data/new-post-form';

import { TSchema } from '@/types/form';
import { ISpec } from '@/types/common';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostSchema } from '@/utils/validation/schemas';

import s from './NewPostForm.module.css';

import CButton from '@/app/components/ui/CButton';
import FormField from '@/app/components/common/form/FormField';

interface IProps {
    categoriesSpecs: ISpec[];
}

export default function NewPostForm({ categoriesSpecs }: IProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSchema>({
        resolver: zodResolver(createPostSchema),
        mode: 'onTouched',
        defaultValues: DEFAULT_VALUES,
    });

    function onSubmit(data: TSchema) {
        console.log(data);
    }

    return (
        <section className={'section'}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={s.form}
            >
                {FIELDS.map(({ is: Component, className, ...f }) => (
                    <FormField
                        key={f.name}
                        error={errors[f.name]?.message || ''}
                        className={className && s[className]}
                    >
                        <Component
                            {...{ ...f, ...register(f.name) }}
                            {...(f.name === 'category' && { specs: categoriesSpecs })}
                        />
                    </FormField>
                ))}

                <div className={s.row}>
                    <CButton type='submit'>Publish</CButton>
                </div>
            </form>
        </section>
    );
}
