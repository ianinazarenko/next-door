import Link from 'next/link';
import CButton from '@/ui/atoms/CButton';

export default function NotFoundPage() {
    const CODE = '404';
    const TEXT = "Ooops... we didn't find anything here";
    const BTN = 'Return Home';

    return (
        <div className={'page c-container flex flex-col items-center justify-center'}>
            <div className={'flex h-full flex-col items-center justify-center'}>
                <h1 className={'h1'}>{CODE}</h1>
                <p className={'card-description'}>{TEXT}</p>
                <Link
                    href='/'
                    className={'pt-4'}
                >
                    <CButton>{BTN}</CButton>
                </Link>
            </div>
        </div>
    );
}
