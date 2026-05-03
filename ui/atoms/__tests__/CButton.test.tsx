import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CButton from '../CButton';

describe('CButton', () => {
    it('renders children correctly', () => {
        render(<CButton>Click me</CButton>);
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();

        render(<CButton onClick={handleClick}>Click me</CButton>);

        const button = screen.getByRole('button', { name: /click me/i });
        await user.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();

        render(
            <CButton
                disabled
                onClick={handleClick}
            >
                Click me
            </CButton>
        );

        const button = screen.getByRole('button', { name: /click me/i });

        expect(button).toBeDisabled();

        await user.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('shows loader and hides content when isLoading is true', () => {
        render(<CButton isLoading={true}>Click me</CButton>);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        expect(button).toBeDisabled();

        expect(screen.queryByText(/click me/i)).not.toBeInTheDocument();
    });

    it('applies correct aria-label', () => {
        render(<CButton ariaLabel='Close modal'>X</CButton>);
        const button = screen.getByRole('button', { name: /close modal/i });
        expect(button).toBeInTheDocument();
    });
});
