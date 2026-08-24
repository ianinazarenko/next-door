// Types
import { IPostFull } from '@/types/posts';
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

const BACK_URL = PAGES.POSTS.link;

async function getPost(id: string): Promise<IPostFull | null> {
    try {
        return await fetchPostCached(id);
    } catch (err) {
        console.error('[posts/[id]]: Error loading post:', id, err);
        throw err;
    }
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const { id } = await params;
    const post = await getPost(id);
    return DYNAMIC_PAGES_METADATA.POST_DETAIL(post);
}

export default async function PostPage({ params }: IProps) {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        return notFound();
    }

    return (
        <div className={'page c-container'}>
            <BackButton backUrl={BACK_URL} />

            <PostMain post={post} />
        </div>
    );
}
