import { formatPhoneNumber } from '@/utils/helpers/phone-utils';

const CORRECT_NUM = '+1 (555) 345-67-89';

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
            const phoneNum = '555-345-67-89';
            expect(formatPhoneNumber(phoneNum)).toBe(CORRECT_NUM);
        });
    });

    describe('boundary cases', () => {
        it('should return as is if 11 digits not starting with 1', () => {
            const phoneNum = '25553456789';
            expect(formatPhoneNumber(phoneNum)).toBe(phoneNum);
        });

        it('should return as is if less than 10 digits', () => {
            const phoneNum = '555';
            expect(formatPhoneNumber(phoneNum)).toBe(phoneNum);
        });

        it('should format 10 digits starts with 1 correctly', () => {
            const phoneNum = '1234567890';
            expect(formatPhoneNumber(phoneNum)).toBe('+1 (123) 456-78-90');
        });
    });

    describe('failure cases', () => {
        it('should return as is if more than 11 digits', () => {
            const phoneNum = '555345678912';
            expect(formatPhoneNumber(phoneNum)).toBe(phoneNum);
        });

        it('should return empty string if number is string with chars', () => {
            expect(formatPhoneNumber('abc')).toBe('');
        });

        it('should return empty string if number is string with symbols', () => {
            expect(formatPhoneNumber('---')).toBe('');
        });

        it('should return empty string if number is null', () => {
            expect(formatPhoneNumber(null)).toBe('');
        });

        it('should return empty string if number is undefined', () => {
            expect(formatPhoneNumber(undefined)).toBe('');
        });

        it('should return empty string if number is empty string', () => {
            expect(formatPhoneNumber('')).toBe('');
        });

        it('should return empty string if number is empty string with space', () => {
            expect(formatPhoneNumber(' ')).toBe('');
        });
    });

    describe('corner cases', () => {
        it('should format formatted number with spaces correctly', () => {
            const phoneNum = ' +1 (555) 345-67-89 ';
            expect(formatPhoneNumber(phoneNum)).toBe(CORRECT_NUM);
        });

        it('should format number with spaces correctly', () => {
            const phoneNum = '1 555 345 67 89';
            expect(formatPhoneNumber(phoneNum)).toBe(CORRECT_NUM);
        });

        it('should format 11-digit number with non-digit chars correctly', () => {
            const phoneNum = '1555abc3456def789';
            expect(formatPhoneNumber(phoneNum)).toBe(CORRECT_NUM);
        });

        it('should format 11-digit number with spaces correctly', () => {
            const phoneNum = ' 1 5 5 5 3 4 5 6 7 8 9';
            expect(formatPhoneNumber(phoneNum)).toBe(CORRECT_NUM);
        });
    });
});
