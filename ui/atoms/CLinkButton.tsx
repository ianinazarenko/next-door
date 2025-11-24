import clsx from 'clsx';
import { Button } from '@headlessui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ILinkButtonProps {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onClick?: () => void;
    isHovering?: boolean;
    isLeft?: boolean;
    children: React.ReactNode;
}

function CLinkButton({ type = 'button', disabled, isHovering, isLeft = false, children }: ILinkButtonProps) {
    const classes =
        'text-[1.4rem] font-semibold transition-colors text-(--accent) group-hover:text-(--accent-hover) lg:text-[1.4rem] group-active:text-(--accent-hover)';
    return (
        <div className={'group flex items-center gap-1'}>
            {isLeft && (
                <ChevronLeft
                    className={clsx(
                        'size-4 text-(--accent) transition-all group-hover:text-(--accent-hover) group-active:text-(--accent-hover)',
                        isHovering && '-translate-x-1 text-(--accent-hover)'
                    )}
                />
            )}

            <Button
                className={clsx(classes, {
                    'text-(--accent-hover)': isHovering,
                })}
                type={type}
                disabled={disabled}
            >
                {children}
            </Button>

            {!isLeft && (
                <ChevronRight
                    className={clsx(
                        'size-4 text-(--accent) transition-all group-hover:text-(--accent-hover) group-active:text-(--accent-hover)',
                        isHovering && 'translate-x-1 text-(--accent-hover)'
                    )}
                />
            )}
        </div>
    );
}

export default CLinkButton;
