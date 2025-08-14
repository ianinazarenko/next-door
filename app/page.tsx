import CurrentComplexTemp from '@/app/components/temp/CurrentComplexTemp';
import TempUIKit from '@/app/components/temp/TempUIKit';

export default function Home() {
    return (
        <div className={'page h-dvw'}>
            <div className={'c-container'}>
                <h1 className={'h1'}>hello world!</h1>

                <CurrentComplexTemp />

                <TempUIKit />
            </div>
        </div>
    );
}
