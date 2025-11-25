import Image from 'next/image';
import clsx from 'clsx';
import s from './UserPic.module.css';

interface IProps {
    image?: string | null;
    className?: string;
    index?: number;
}

const IMAGE = 'https://picsum.photos/200';
export default function UserPic({ image, className, index }: IProps) {
    const randomImg = index ? `${IMAGE}?random=${index}` : IMAGE;
    return (
        <Image
            src={image || randomImg}
            width={200}
            height={200}
            sizes='(max-width: 768px) 6rem, (max-width: 1024px) 8rem, 8rem'
            alt='User image'
            className={clsx(s.image, className)}
        />
    );
}
