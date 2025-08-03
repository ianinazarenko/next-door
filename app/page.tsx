// import Image from 'next/image';

import CurrentComplexTemp from '@/app/components/temp/CurrentComplexTemp';

export default function Home() {
    return (
        <div className={'page'}>
            <div className={'container'}>
                <h1 className={'h1'}>hello world!</h1>

                <CurrentComplexTemp />
            </div>
        </div>
    );
}
