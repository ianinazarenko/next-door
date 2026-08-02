import { getInitial, getUserColor } from '@/utils/helpers/user-utils';

const USER_NAME = 'Tony Stark';
const FALLBACK_INITIAL = '?';

describe('getInitial', () => {
    it('should return one letter for an existing name', () => {
        expect(getInitial(USER_NAME)).toBe('T');
    });

    it('should return "?" for non-string values', () => {
        // @ts-expect-error - intentionally passes an invalid runtime value to verify the defensive fallback
        expect(getInitial([])).toBe(FALLBACK_INITIAL);
    });

    it('should return "?" for null', () => {
        expect(getInitial(null)).toBe(FALLBACK_INITIAL);
    });
});

describe('getUserColor', () => {
    it('should return first color for null', () => {
        expect(getUserColor(null)).toBe('#4A90E2');
    });

    it('should return the same color for the same identifier', () => {
        const ID = 'afkjaelf';
        const first = getUserColor(ID);
        const second = getUserColor(ID);

        expect(first).toBe(second);
    });
});
