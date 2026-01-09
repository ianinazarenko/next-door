'use client';

import { EFormStatus, REDIRECT_DELAY, STATUS_DICT } from '@/utils/constants/forms';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import s from './NewPostFormStatus.module.css';

import CButton from '@/ui/atoms/CButton';
import { PAGES } from '@/data/pages';

interface IProps {
    status: Extract<EFormStatus, EFormStatus.Success | EFormStatus.Error>;
    resetForm: () => void;
}

const ERROR_BTN_LABEL = 'Try again';

export default function NewPostFormStatus({ status, resetForm }: IProps) {
    const router = useRouter();
    const [countdown, setCountdown] = useState(REDIRECT_DELAY);

    useEffect(() => {
        if (status !== EFormStatus.Success) return;

        const timer = setInterval(() => {
            setCountdown((current) => current - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [status]);

    useEffect(() => {
        if (countdown === 0) {
            router.push(PAGES.POSTS.link);
        }
    }, [countdown, router]);

    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <p className={clsx('h2', s.title)}>{STATUS_DICT[status].title}</p>

                <p className={clsx('card-description', s.desc)}>{STATUS_DICT[status].desc}</p>

                {status === EFormStatus.Success && (
                    <p className={'card-meta'}>
                        You will be redirected to the Board page in... {countdown} second{countdown !== 1 ? 's' : ''}
                    </p>
                )}

                {status === EFormStatus.Error && (
                    <div className={'pb-4'}>
                        <CButton onClick={resetForm}>{ERROR_BTN_LABEL}</CButton>
                    </div>
                )}
            </div>
        </div>
    );
}
