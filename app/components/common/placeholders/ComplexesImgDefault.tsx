import s from './ComplexesImgDefault.module.css';
import { Building2 } from 'lucide-react';

export default function ComplexesImgDefault() {
    return (
        <div className={s.container}>
            <Building2 className={s.icon} />
        </div>
    );
}
