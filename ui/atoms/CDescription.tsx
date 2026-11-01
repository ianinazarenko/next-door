import { Description } from '@headlessui/react';

function CDescription({ children }: { children?: React.ReactNode }) {
    return <Description className='mt-1 text-[1.4rem] leading-5 text-(--text-secondary)'>{children}</Description>;
}

export default CDescription;
