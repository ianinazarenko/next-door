// Constants
import { PAGES } from '@/data/pages';
import { DYNAMIC_PAGES_METADATA } from '@/data/seo';
// Types
import { Metadata } from 'next';
// Utils
import { fetchPostCached } from '@/lib/data-access/queries/posts';
import { notFound } from 'next/navigation';
// Components
import PostMain from '@/app/(public)/posts/[id]/(components)/main/PostMain';
import BackButton from '@/ui/common/buttons/BackButton';

export const revalidate = 300;

interface IProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const { id } = await params;
    const post = await fetchPostCached(id);
    return DYNAMIC_PAGES_METADATA.POST_DETAIL(post);
}

const BACK_URL = PAGES.POSTS.link;
export default async function PostPage({ params }: IProps) {
    const { id } = await params;
    const post = await fetchPostCached(id);

    if (!post) {
        return notFound();
    }

    try {
        return (
            <div className={'page c-container'}>
                <BackButton backUrl={BACK_URL} />

                <PostMain post={post} />
            </div>
        );
    } catch (error) {
        console.error('[PostPage]: Error loading post:', error);
        throw error;
    }
}
