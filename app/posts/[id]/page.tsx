export default function PostPage({ params }: { params: { id: string } }) {
    return <div className={'page c-container'}>Post page with id: {params.id}</div>;
}
