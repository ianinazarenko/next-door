import s from './TheFooter.module.css';

export default function TheFooter() {
    const DISCLAIMER = 'All rights reserved.';
    const year = new Date().getFullYear();

    return (
        <footer className={s.footer}>
            <div className={'c-container'}>
                <p className={'card-description'}>
                    &copy;&nbsp;{year}&nbsp;{DISCLAIMER}
                </p>
            </div>
        </footer>
    );
}
