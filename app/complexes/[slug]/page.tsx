export default async function ComplexPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <div className={'page c-container'}>Complex Page with slug: {slug}</div>;
}
