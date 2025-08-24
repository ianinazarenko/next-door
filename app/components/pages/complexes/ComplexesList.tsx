import { IComplexBase } from '@/types/complexes';
import ComplexesCard from '@/app/components/pages/complexes/ComplexesCard';

const TITLE = 'Available Complexes';

export default function ComplexesList({ complexes }: { complexes: IComplexBase[] }) {
    return (
        <div>
            <h2 className={'h4'}>{TITLE}</h2>

            {complexes.map((item) => (
                <ComplexesCard
                    key={item.id}
                    title={item.name}
                    address={item.address}
                />
            ))}
        </div>
    );
}
