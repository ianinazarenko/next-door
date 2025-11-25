import { dateFormatter } from '@/utils/helpers/date-utils';
import s from './PostHeader.module.css';
import clsx from 'clsx';

interface IProps {
    title: string;
    author: string;
    createdAt: Date;
}

export default function PostHeader({ title, author, createdAt }: IProps) {
    return (
        <section>
            <h1 className={'h1'}>{title}</h1>

            <div className={clsx('card-meta', s.desc)}>
                Posted by <span className={s.primary}>{author}</span> on{' '}
                <span className={s.primary}>{dateFormatter.format(createdAt)}</span>
            </div>
        </section>
    );
}
