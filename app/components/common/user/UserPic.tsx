import Image from 'next/image';
import clsx from 'clsx';
import s from './UserPic.module.css';

interface IProps {
    image?: string | null;
    className?: string;
}

const IMAGE = 'https://picsum.photos/200';
export default function UserPic({ image, className }: IProps) {
    return (
        <Image
            src={image || IMAGE}
            width={200}
            height={200}
            sizes='(max-width: 768px) 6rem, (max-width: 1024px) 8rem, 8rem'
            alt='User image'
            className={clsx(s.image, className)}
        />
    );
}
