import { PAGES } from '@/data/pages';
import { EFormStatus, REDIRECT_DELAY, STATUS_DICT } from '@/utils/constants/forms';
import { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSession } from 'next-auth/react';
import { mockPush } from '@/jest.setup';
import { createPostAction } from '@/lib/actions/create-post';
// 1. Сначала мокаем зависимости
jest.mock('next-auth/react');
jest.mock('@/lib/actions/create-post', () => ({
    createPostAction: jest.fn(),
}));

// 2. Потом импортируем компонент
import NewPostForm from '@/app/(public)/posts/new/(components)/form/NewPostForm';

// 2. Подготавливаем фейковые данные для пропсов (specs)
const MOCK_SPECS = {
    category: [{ label: 'Category 1', value: 'cat-1' }],
    complex: [{ label: 'Complex 1', value: 'comp-1' }],
};

describe('NewPostForm - Integration', () => {
    beforeAll(() => {
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should disable publish button and show notice when user is not authenticated', () => {
        // Притворяемся, что пользователь НЕ авторизован
        (useSession as jest.Mock).mockReturnValue({
            status: 'unauthenticated',
        });

        render(<NewPostForm specs={MOCK_SPECS} />);

        // Проверяем, что кнопка заблокирована
        const publishButton = screen.getByRole('button', { name: /publish/i });
        expect(publishButton).toBeDisabled();

        // Проверяем наличие текста-предупреждения
        expect(screen.getByText(/must be signed in to publish/i)).toBeInTheDocument();
    });

    it('should successfully submit form when all fields are valid', async () => {
        jest.useFakeTimers();

        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

        (useSession as jest.Mock).mockReturnValue({
            status: 'authenticated',
        });

        render(<NewPostForm specs={MOCK_SPECS} />);

        // Заполняем текстовые поля
        await user.type(screen.getByLabelText(/Title/i), 'My New Awesome Post');
        await user.type(screen.getByLabelText(/Short text/i), 'This is a short description');
        await user.type(
            screen.getByLabelText(/Detailed text/i),
            'This is a much longer full text for the post content'
        );

        const publishButton = screen.getByRole('button', { name: /publish/i });

        // Checking that the button is not disabled / just in case
        expect(publishButton).not.toBeDisabled();

        await user.click(publishButton);

        await waitFor(() => {
            expect(createPostAction).toHaveBeenCalled();
        });

        expect(createPostAction).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'My New Awesome Post',
                category: 'cat-1',
                complex: 'comp-1',
            })
        );

        await waitFor(() => {
            expect(screen.getByText(STATUS_DICT[EFormStatus.Success].desc)).toBeInTheDocument();
        });

        act(() => {
            jest.advanceTimersByTime(REDIRECT_DELAY * 1000);
        });

        expect(mockPush).toHaveBeenCalledWith(expect.stringContaining(PAGES.POSTS.link));

        jest.useRealTimers();
    });

    it('should show validation errors when fields are invalid', async () => {
        const user = userEvent.setup();

        (useSession as jest.Mock).mockReturnValue({
            status: 'authenticated',
        });

        render(<NewPostForm specs={MOCK_SPECS} />);

        const button = screen.getByRole('button', { name: /publish/i });
        await user.click(button);

        const error = await screen.findByText(/Title is required/i);
        expect(error).toBeInTheDocument();
        expect(createPostAction).not.toHaveBeenCalled();
    });
});
