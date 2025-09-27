import { PulseLoader } from 'react-spinners';

export default function NewPostLoader() {
    return (
        <div className='flex h-[50dvh] w-full items-center justify-center'>
            <PulseLoader />
        </div>
    );
}
