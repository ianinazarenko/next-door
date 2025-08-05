import { Button } from '@headlessui/react';

interface IButtonProps {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}

function CButton({ type = 'button', disabled, onClick, children }: IButtonProps) {
    const classes =
        'h-(--btn-height) rounded-(--radius-btn) bg-(--accent) px-(--p-btn) text-[1.2rem] font-semibold text-(--bg-primary) transition-colors hover:bg-(--accent-hover) lg:text-[1.4rem]';
    return (
        <Button
            className={classes}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}

export default CButton;
