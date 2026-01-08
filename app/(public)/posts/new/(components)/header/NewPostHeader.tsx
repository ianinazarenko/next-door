import s from './NewPostHeader.module.css';
import clsx from 'clsx';

const TITLE = 'Create New Announcement';
const DESCRIPTION = 'Fill out the form below to share something with your community';
export default function NewPostHeader() {
    return (
        <section className={s.header}>
            <h1 className={clsx('h1 py-4')}>{TITLE}</h1>
            <p className={'card-description'}>{DESCRIPTION}</p>
        </section>
    );
}
