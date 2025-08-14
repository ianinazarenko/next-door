import { Description } from '@headlessui/react';

function CDescription({ children }: { children?: React.ReactNode }) {
    return <Description className='text-[1.4rem] text-(--text-secondary)'>{children}</Description>;
}

export default CDescription;
