import { ITEMS_PER_PAGE } from '@/utils/constants/posts';
import s from './ComplexesListSkeleton.module.css';
import clsx from 'clsx';

export default function ComplexesListSkeleton() {
    return (
        <div className={s.list}>
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
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
