import s from './UserPic.module.css';
import clsx from 'clsx';
import { getInitial, getUserColor } from '@/utils/helpers/user-utils';
import Image from 'next/image';

interface IProps {
    image?: string | null;
    name?: string | null;
    className?: string;
    index?: number | string;
}

export default function UserPic({ image, name, className, index }: IProps) {
    // Case 1: User has profile image
    if (image) {
        return (
            <Image
                src={image}
                width={200}
                height={200}
                sizes='(max-width: 768px) 6rem, (max-width: 1024px) 8rem, 8rem'
                alt={name ? `${name}'s avatar` : 'User avatar'}
                className={clsx(s.image, className)}
            />
        );
    }

    // Case 2: No image - show initial with color
    const initial = getInitial(name);
    const bgColor = getUserColor(index);

    return (
        <div
            className={clsx(s.image, s.initial, className)}
            style={{ backgroundColor: bgColor }}
            aria-label={name ? `${name}'s avatar` : 'User avatar'}
        >
            <span className={s.initialText}>{initial}</span>
        </div>
    );
}
