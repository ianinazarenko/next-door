'use client';

import type { ISpec } from '@/types/common';
import type { INewPostField, TSchema } from '@/types/forms';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PulseLoader } from 'react-spinners';

import { DEFAULT_VALUES, FIELD_GROUPS } from '@/data/new-post-form';
import { createPostAction } from '@/lib/actions/create-post';
import CButton from '@/ui/atoms/CButton';
import FormField from '@/ui/common/form/FormField';
import { EFormStatus } from '@/utils/constants/forms';
import { createPostSchema } from '@/utils/validation/schemas';

import s from './NewPostForm.module.css';
import NewPostFormStatus from './NewPostFormStatus';

type TSpecTypes = Extract<keyof TSchema, 'category' | 'complex'>;
interface IProps {
    specs: Record<TSpecTypes, ISpec[]>;
}

const isSpecType = (key: string): key is TSpecTypes => {
    return key === 'category' || key === 'complex';
};

const SIGN_IN_NOTICE = 'You must be signed in to publish a post.';
const BTN_TEXT = 'Publish';

export default function NewPostForm({ specs }: IProps) {
    const { status: sessionStatus } = useSession();
    const isSignedIn = sessionStatus === 'authenticated';

    const [status, setStatus] = useState<EFormStatus>(EFormStatus.Idle);
    const anchorRef = useRef<HTMLElement>(null);

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
        control,
    } = useForm<TSchema>({
        resolver: zodResolver(createPostSchema),
        mode: 'onTouched',
        defaultValues,
    });

    function scrollToAnchor() {
        if (anchorRef.current) {
            anchorRef.current.scrollIntoView();
        }
    }

    function getProps(f: Omit<INewPostField, 'is'>) {
        return {
            ...{ ...f, ...register(f.name) },
            ...(isSpecType(f.name) ? { specs: specs[f.name] } : {}),
        };
    }

    // ==== FORM ACTIONS ====
    function resetForm() {
        reset(defaultValues);
        setStatus(EFormStatus.Idle);
    }

    async function onSubmit(data: TSchema) {
        setStatus(EFormStatus.Loading);
        scrollToAnchor();

        try {
            await createPostAction(data);
            setStatus(EFormStatus.Success);
        } catch (error) {
            setStatus(EFormStatus.Error);
            console.warn('[NewPostForm / onSubmit] Error creating post:', error);
        }
    }

    return (
        <section ref={anchorRef} className={'section'}>
            {/* ==== FORM STATUSES ==== */}
            {(status === EFormStatus.Success || status === EFormStatus.Error) && (
                <NewPostFormStatus status={status} resetForm={resetForm} />
            )}

            {/* ==== FORM ==== */}
            {[EFormStatus.Idle, EFormStatus.Loading].includes(status) && (
                <form
                    // react-hook-form's handleSubmit returns a stable submit handler here.
                    // eslint-disable-next-line react-hooks/refs
                    onSubmit={handleSubmit(onSubmit)}
                    className={s.form}
                >
                    {FIELD_GROUPS.map(({ title, fields }) => (
                        <fieldset key={title} className={s.group}>
                            <legend className={s.groupTitle}>{title}</legend>

                            <div className={s.fields}>
                                {fields.map(
                                    ({ is: Component, className, maxLength, ...f }) =>
                                        (!isSpecType(f.name) || specs[f.name].length > 0) && (
                                            <FormField
                                                key={f.name}
                                                name={f.name}
                                                error={errors[f.name]?.message || ''}
                                                errorId={`new-post-${f.name}-error`}
                                                maxLength={maxLength}
                                                control={control}
                                                className={className && s[className]}
                                            >
                                                <Component
                                                    {...getProps(f)}
                                                    disabled={status === EFormStatus.Loading}
                                                    aria-invalid={Boolean(errors[f.name])}
                                                    aria-errormessage={
                                                        errors[f.name]
                                                            ? `new-post-${f.name}-error`
                                                            : undefined
                                                    }
                                                />
                                            </FormField>
                                        )
                                )}
                            </div>
                        </fieldset>
                    ))}

                    <div className={s.bottom}>
                        <CButton
                            type='submit'
                            disabled={status === EFormStatus.Loading || !isSignedIn}
                        >
                            {BTN_TEXT}
                        </CButton>

                        {!isSignedIn && (
                            <p className={clsx('card-meta', s.notice)}>{SIGN_IN_NOTICE}</p>
                        )}
                    </div>

                    {status === EFormStatus.Loading && (
                        <div className={s.loader}>
                            <PulseLoader color={'var(--text-primary)'} size={12} />
                        </div>
                    )}
                </form>
            )}
        </section>
    );
}
