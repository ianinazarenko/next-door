import Link from 'next/link';
import CButton from '@/app/components/ui/CButton';

export default function NotFoundPage() {
    const CODE = '404';
    const TEXT = "Ooops... we didn't find anything here";
    const BTN = 'Return Home';

    return (
        <div className={'page c-container'}>
            <div className={'flex flex-col items-center justify-center pt-20'}>
                <div className={'h1'}>{CODE}</div>
                <div className={'card-description'}>{TEXT}</div>
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
