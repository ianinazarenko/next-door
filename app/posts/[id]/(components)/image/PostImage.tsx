import s from './PostImage.module.css';
import Image from 'next/image';
import clsx from 'clsx';

interface IProps {
    image?: string | null;
}

const IMAGE_MOB = 'https://picsum.photos/600/400';
const IMAGE_DESK = 'https://picsum.photos/1200/800';
export default function PostImage({ image }: IProps) {
    return (
        <div>
            <div className={s.container}>
                <Image
                    src={image || IMAGE_MOB}
                    sizes='100vw'
                    alt='Post image'
                    className={clsx(s.image, s.mob)}
                    fill
                />

                <Image
                    src={image || IMAGE_DESK}
                    sizes='100vw'
                    alt='Post image'
                    className={clsx(s.image, s.desk)}
                    fill
                />
            </div>
            <p className={'card-meta pt-1'}>This image is random</p>
        </div>
    );
}
