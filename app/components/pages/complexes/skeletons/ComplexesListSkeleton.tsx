import s from './ComplexesListSkeleton.module.css';
import clsx from 'clsx';

export default function ComplexesListSkeleton() {
    return (
        <div>
            {Array.from({ length: 4 }).map((_, i) => (
                <div
                    key={i}
                    className={s.card}
                >
                    <div className={clsx(s.img, 'skeleton')}></div>

                    <div className={s.info}>
                        <div className={clsx(s.title, 'skeleton')}>
                            <div className={s.highlight}></div>
                        </div>
                        <div className={clsx(s.address, 'skeleton')}></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
