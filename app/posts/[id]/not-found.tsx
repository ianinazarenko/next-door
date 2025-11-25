import { PAGES } from '@/data/pages';
import Link from 'next/link';
import CButton from '@/ui/atoms/CButton';

const BTN = 'Browse All Announcements';
const TITLE = 'Announcement Not Found';
const TEXT = "Sorry, the announcement you're looking for doesn't exist or has been moved.";
export default function PostNotFound() {
    return (
        <div className={'page c-container flex flex-col items-center justify-center'}>
            <div className={'flex h-full flex-col items-center justify-center'}>
                <h1 className={'h1'}>{TITLE}</h1>
                <p className={'card-description text-center'}>{TEXT}</p>

                <Link
                    href={PAGES.POSTS.link}
                    className={'pt-4'}
                >
                    <CButton>{BTN}</CButton>
                </Link>
            </div>
        </div>
    );
}
