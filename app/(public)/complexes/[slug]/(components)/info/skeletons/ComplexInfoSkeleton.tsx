import s from '@/app/(public)/complexes/[slug]/(components)/info/skeletons/ComplexInfoSkeleton.module.css';
import clsx from 'clsx';

export default function ComplexInfoSkeleton() {
    return (
        <div
            className={'section'}
            aria-hidden='true'
        >
            <div className={s.header}>
                <div className={clsx(s.description, 'skeleton')} />
                <div className={clsx(s.description, 'skeleton')} />
            </div>

            <div className={s.container}>
                <div className={s.wrapper}>
                    <div className={clsx(s.title, 'skeleton')} />
                    <div className={clsx(s.companyName, 'skeleton')} />
                    <div className={s.list}>
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div
                                key={index}
                                className={clsx(s.item, 'skeleton')}
                            />
                        ))}
                    </div>
                </div>

                <div className={s.wrapper}>
                    <div className={clsx(s.title, 'skeleton')} />
                    <div className={s.list}>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className={clsx(s.item, 'skeleton')}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
