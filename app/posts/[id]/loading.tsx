import { PAGES } from '@/data/pages';
import PostMainSkeleton from '@/app/posts/[id]/(components)/main/skeleton/PostMainSkeleton';
import BackButton from '@/ui/common/back-button/BackButton';

const BACK_URL = PAGES.POSTS.link;

export default function PostPageLoading() {
    return (
        <div className={'page c-container'}>
            <BackButton backUrl={BACK_URL} />

            <PostMainSkeleton />
        </div>
    );
}
