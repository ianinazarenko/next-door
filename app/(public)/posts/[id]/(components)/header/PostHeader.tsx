import clsx from 'clsx';

import { dateFormatter } from '@/utils/helpers/date-utils';

import s from './PostHeader.module.css';

interface IProps {
    title: string;
    author?: string | null;
    createdAt: Date;
}

export default function PostHeader({ title, author, createdAt }: IProps) {
    return (
        <section>
            {title && <h1 className={'h1'}>{title}</h1>}

            <div className={clsx('card-meta', s.desc)}>
                Posted by <span className={s.primary}>{author || 'Anonymous'}</span> on{' '}
                <span className={s.primary}>{dateFormatter.format(createdAt)}</span>
            </div>
        </section>
    );
}
