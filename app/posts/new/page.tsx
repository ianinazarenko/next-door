import NewPostHeader from '@/app/components/pages/posts-new/NewPostHeader';
import NewPostForm from '@/app/components/pages/posts-new/form/NewPostForm';

export default function NewPostPage() {
    return (
        <div className={'page c-container'}>
            <NewPostHeader />

            <NewPostForm />
        </div>
    );
}
