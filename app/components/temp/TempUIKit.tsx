'use client';

import CButton from '@/app/components/ui/CButton';
import CInput from '@/app/components/ui/CInput';
import CSelect from '@/app/components/ui/CSelect';

function TempUIKit() {
    function onClick() {
        console.log('click');
    }

    const specs = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
    ];

    return (
        <div className='max-w-2xl'>
            <div className='py-(--p-md)'>
                <CButton onClick={onClick}>Label</CButton>
            </div>
            <div className='py-(--p-md)'>
                <CInput
                    label={'Your name'}
                    description={'Use your real name so people will recognize you.'}
                />
            </div>
            <div className='py-(--p-md)'>
                <CSelect
                    label={'Make your choice'}
                    description={'We currently only ship to North America.'}
                    specs={specs}
                />
            </div>
        </div>
    );
}

export default TempUIKit;
