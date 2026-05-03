import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CInput from '../CInput';

const INPUT_VALUE = 'Test Value';
const LABEL = 'Test Label';
const DESCRIPTION = 'Test Description';
const PLACEHOLDER = 'Test Placeholder';
const handleChange = () => {
    //
};

describe('CInput', () => {
    it('renders input with correct value', () => {
        render(
            <CInput
                value={INPUT_VALUE}
                onChange={handleChange}
            />
        );

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(INPUT_VALUE);
    });

    it('renders label and focuses input on label click', async () => {
        const user = userEvent.setup();
        render(
            <CInput
                value={INPUT_VALUE}
                label={LABEL}
                onChange={handleChange}
            />
        );

        const input = screen.getByRole('textbox', { name: LABEL });
        expect(input).toBeInTheDocument();

        const label = screen.getByText(LABEL);
        expect(label).toBeInTheDocument();

        await user.click(label);
        expect(input).toHaveFocus();
    });

    it('renders description', () => {
        render(
            <CInput
                value={INPUT_VALUE}
                description={DESCRIPTION}
                onChange={handleChange}
            />
        );

        const desc = screen.getByText(DESCRIPTION);
        expect(desc).toBeInTheDocument();
    });

    it('renders placeholder', () => {
        render(
            <CInput
                value={INPUT_VALUE}
                placeholder={PLACEHOLDER}
                onChange={handleChange}
            />
        );

        const input = screen.getByPlaceholderText(PLACEHOLDER);
        expect(input).toBeInTheDocument();
    });

    it('called onChange when input value changes', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        const USER_INPUT = 'test';

        render(
            <CInput
                value=''
                onChange={handleChange}
            />
        );

        const input = screen.getByRole('textbox');
        await user.type(input, USER_INPUT);

        expect(handleChange).toHaveBeenCalledTimes(USER_INPUT.length);
    });

    it('does not call onChange when input disabled', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        render(
            <CInput
                value={INPUT_VALUE}
                onChange={handleChange}
                disabled
            />
        );

        const input = screen.getByRole('textbox');
        expect(input).toBeDisabled();

        await user.type(input, 'test');
        expect(handleChange).not.toHaveBeenCalled();
    });
});
