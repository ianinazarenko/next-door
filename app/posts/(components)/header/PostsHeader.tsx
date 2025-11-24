import s from './PostsHeader.module.css';

const TITLE = 'Announcements';
const DESCRIPTION = 'Stay updated with the latest news and announcements from the community.';

export default function PostsHeader() {
    return (
        <section className={s.wrapper}>
            <h1 className={'h1'}>{TITLE}</h1>
            <p className={'card-description'}>{DESCRIPTION}</p>
        </section>
    );
}
