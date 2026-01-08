import s from '@/app/(public)/complexes/[slug]/(components)/info/skeletons/ComplexInfoSkeleton.module.css';
import clsx from 'clsx';

export default function ComplexInfoSkeleton() {
    return (
        <div className={'section'}>
            <div className={s.header}>
                <div className={clsx(s.description, 'skeleton')} />
                <div className={clsx(s.description, 'skeleton')} />
            </div>

            <div className={s.container}>
                {Array.from({ length: 2 }).map((_, i) => (
                    <div
                        key={`section-${i}`}
                        className={clsx(s.wrapper, 'skeleton')}
                    >
                        <div className={clsx(s.title, 'skeleton')} />

                        <div className={s.list}>
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <div
                                    key={`item-${idx}`}
                                    className={clsx(s.item, 'skeleton')}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
