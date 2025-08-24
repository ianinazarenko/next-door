import s from './ComplexesCard.module.css';
import Image from 'next/image';
import ComplexesImgDefault from '@/app/components/common/placeholders/ComplexesImgDefault';

interface IProps {
    title: string;
    address: string | null;
    img?: string;
}

export default function ComplexesCard({ title, address, img = '' }: IProps) {
    return (
        <div className={s.card}>
            {img ? (
                <Image
                    src={img}
                    alt={'Alt'}
                />
            ) : (
                <ComplexesImgDefault />
            )}

            <div className={s.info}>
                {title && <h3 className={'card-title'}>{title}</h3>}
                {address && <p className={'card-description'}>{address}</p>}
            </div>
        </div>
    );
}
