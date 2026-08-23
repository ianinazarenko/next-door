import s from './PostImage.module.css';
import Image from 'next/image';

interface IProps {
    image?: string | null;
}

const IMAGE_DESK = 'https://picsum.photos/1200/800';
export default function PostImage({ image }: IProps) {
    return (
        <div>
            <div className={s.container}>
                <Image
                    src={image || IMAGE_DESK}
                    sizes='(min-width: 1024px) 800px, 100vw'
                    alt='Post image'
                    className={s.image}
                    fill
                />

                <p className={'card-meta pt-1'}>This image is random</p>
            </div>
        </div>
    );
}
