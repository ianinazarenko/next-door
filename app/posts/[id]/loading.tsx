import { PAGES } from '@/utils/data/pages';
import PostMainSkeleton from '@/app/components/pages/post/skeleton/PostMainSkeleton';
import BackButton from '@/app/components/common/back-button/BackButton';

const BACK_URL = PAGES.POSTS.link;

export default function PostPageLoading() {
    return (
        <div className={'page c-container'}>
            <BackButton backUrl={BACK_URL} />

            <PostMainSkeleton />
        </div>
    );
}
