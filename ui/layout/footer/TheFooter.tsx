import s from './TheFooter.module.css';

const year = new Date().getFullYear();
const PROFILE_LINK = 'https://github.com/ianinazarenko';
const PROJECT_LINK = 'https://github.com/ianinazarenko/next-door';

const TEXT = {
    disclaimer: 'Demo project by ',
    name: 'Ianina Nazarenko',
    viewSource: 'View source on ',
    github: 'GitHub',
};

const PROPS = {
    target: '_blank',
    rel: 'noopener noreferrer',
    className: s.link,
};

export default function TheFooter() {
    return (
        <footer className={s.footer}>
            <div className='c-container'>
                <p className='card-meta'>
                    © {year} {TEXT.disclaimer}
                    <a
                        href={PROFILE_LINK}
                        {...PROPS}
                    >
                        {TEXT.name}
                    </a>
                    <br />
                    {TEXT.viewSource}
                    <a
                        href={PROJECT_LINK}
                        {...PROPS}
                    >
                        {TEXT.github}
                    </a>
                </p>
            </div>
        </footer>
    );
}
