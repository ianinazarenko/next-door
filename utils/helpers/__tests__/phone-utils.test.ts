import { formatPhoneNumber } from '@/utils/helpers/phone-utils';

const CORRECT_NUM = '+1 (555) 345-6789';

describe('Format Phone Number', () => {
    describe('happy path', () => {
        it('should format 11 digits number correctly', () => {
            const phoneNum = '15553456789';
            expect(formatPhoneNumber(phoneNum)).toBe(CORRECT_NUM);
        });

        it('should format 10 digits number correctly', () => {
            const phoneNum = '5553456789';
            expect(formatPhoneNumber(phoneNum)).toBe(CORRECT_NUM);
        });

        it('should format 10 digits with special symbols correctly', () => {
            const phoneNum = '+1 (555) 123-4567';
            expect(formatPhoneNumber(phoneNum)).toBe(phoneNum);
        });
    });

    describe('edge cases', () => {
        it('should return 3 digits for emergency phones', () => {
            const phoneNum = '911';
            expect(formatPhoneNumber(phoneNum)).toBe(phoneNum);
        });

        it('should return empty string for null, undefined and empty string', () => {
            expect(formatPhoneNumber(null)).toBe('');
            expect(formatPhoneNumber(undefined)).toBe('');
            expect(formatPhoneNumber('')).toBe('');
        });
    });

    describe('corner cases', () => {
        it('should format 10 digits starts with 1 correctly', () => {
            const phoneNum = '1234567890';
            expect(formatPhoneNumber(phoneNum)).toBe('+1 (123) 456-7890');
        });

        it('should format 10 digits starts with 1 correctly', () => {
            const phoneNum = '1234567890';
            expect(formatPhoneNumber(phoneNum)).toBe('+1 (123) 456-7890');
        });

        it('should format 11-digit number with non-digit chars correctly', () => {
            const phoneNum = '1555abc3456def789';
            expect(formatPhoneNumber(phoneNum)).toBe(CORRECT_NUM);
        });
    });

    describe('failure cases', () => {
        it('should return as is if less than 10 digits', () => {
            const phoneNum = '1234';
            expect(formatPhoneNumber(phoneNum)).toBe(phoneNum);
        });

        it('should return as is if more than 11 digits', () => {
            const phoneNum = '555345678912';
            expect(formatPhoneNumber(phoneNum)).toBe(phoneNum);
        });

        it('should return empty string if number is string with chars', () => {
            const str = 'NotANumberABC';
            expect(formatPhoneNumber(str)).toBe('');
        });

        it('should return empty string if number is string with symbols', () => {
            const str = '---';
            expect(formatPhoneNumber(str)).toBe('');
        });
    });
});
