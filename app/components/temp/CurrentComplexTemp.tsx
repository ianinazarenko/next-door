'use client';

import { AppDispatch, RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedComplex } from '@/lib/store/slices/complexSlice';

function CurrentComplexTemp(): React.ReactNode {
    const selectedComplex = useSelector((state: RootState) => state.complex.selectedComplex);
    const dispatch = useDispatch<AppDispatch>();

    function onClick() {
        const newComplex = `new-complex-${(Math.random() * 10).toFixed(0)}`;
        dispatch(setSelectedComplex(newComplex));
    }

    return (
        <>
            <p className={'card-meta'}>Current Complex: {selectedComplex ?? 'not selected'}</p>
            <button
                onClick={onClick}
                type="button"
                className={'btn btn-primary'}
            >
                Select complex
            </button>
        </>
    );
}

export default CurrentComplexTemp;
