import { Label } from '@headlessui/react';

function CLabel({ children }: { children?: React.ReactNode }) {
    return <Label className='text-[1.6rem] font-semibold text-(--text-primary)'>{children}</Label>;
}

export default CLabel;
