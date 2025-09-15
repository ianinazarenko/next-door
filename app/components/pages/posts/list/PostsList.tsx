import { IPostListItem } from '@/types/posts';

interface IProps {
    posts: IPostListItem[];
}

export default function PostsList({ posts }: IProps) {
    return (
        <section className={'section'}>
            {posts.map((post) => (
                <div key={post.id}>{post.title}</div>
            ))}
        </section>
    );
}
