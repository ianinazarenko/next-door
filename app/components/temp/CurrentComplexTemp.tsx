'use client';

import { AppDispatch, RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedComplex } from '@/lib/store/slices/complexSlice';
import CButton from '@/app/components/ui/CButton';

function CurrentComplexTemp(): React.ReactNode {
    const selectedComplex = useSelector((state: RootState) => state.complex.selectedComplex);
    const dispatch = useDispatch<AppDispatch>();

    function onClick() {
        const newComplex = `new-complex-${(Math.random() * 10).toFixed(0)}`;
        dispatch(setSelectedComplex(newComplex));
    }

    return (
        <>
            <p className={'card-meta mt-4 mb-3'}>Current Complex: {selectedComplex ?? 'not selected'}</p>

            <CButton onClick={onClick}>Select complex</CButton>
        </>
    );
}

export default CurrentComplexTemp;
