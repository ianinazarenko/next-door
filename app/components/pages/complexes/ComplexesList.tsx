import ComplexesCard from '@/app/components/pages/complexes/ComplexesCard';

const TITLE = 'Available Complexes';

export default function ComplexesList() {
    return (
        <div>
            <h2 className={'h4'}>{TITLE}</h2>

            {[1, 2, 3, 4, 5, 6].map((item) => (
                <ComplexesCard
                    key={item}
                    title={'Title'}
                    address={'address'}
                />
            ))}
        </div>
    );
}
