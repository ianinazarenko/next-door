import { parsePhoneNumber } from '@/utils/helpers/phone-utils';

const FULL_NUMBER_10 = '5553456789';
const FULL_NUMBER_11 = '15553456789';
const READABLE_NUMBER = '+1 (555) 345-6789';
const CALLABLE_NUMBER = '+15553456789';
const VALID_FULL_EXPECTATION = {
    readable: READABLE_NUMBER,
    callable: CALLABLE_NUMBER,
    isDialable: true,
};

describe('parsePhoneNumber', () => {
    describe('happy path', () => {
        it('should parse 10 digits number correctly', () => {
            expect(parsePhoneNumber(FULL_NUMBER_10)).toEqual(VALID_FULL_EXPECTATION);
        });

        it('should parse 11 digits number correctly', () => {
            expect(parsePhoneNumber(FULL_NUMBER_11)).toEqual(VALID_FULL_EXPECTATION);
        });

        it('should parse formatted number correctly', () => {
            const phoneNum = '+1 (555) 123-4567';
            expect(parsePhoneNumber(phoneNum)).toEqual({
                readable: phoneNum,
                callable: '+15551234567',
                isDialable: true,
            });
        });

        it('should parse trimmed number correctly', () => {
            expect(parsePhoneNumber('  5553456789  ')).toEqual(VALID_FULL_EXPECTATION);
        });
    });

    describe('edge cases', () => {
        it('should return emergency number as dialable', () => {
            const phoneNum = '911';

            expect(parsePhoneNumber(phoneNum)).toEqual({
                readable: '911',
                callable: '911',
                isDialable: true,
            });
        });

        it('should return empty values for null, undefined and empty string', () => {
            const EMPTY_FULL_EXPECTATION = {
                readable: '',
                callable: '',
                isDialable: false,
            };

            expect(parsePhoneNumber(null)).toEqual(EMPTY_FULL_EXPECTATION);
            expect(parsePhoneNumber(undefined)).toEqual(EMPTY_FULL_EXPECTATION);
            expect(parsePhoneNumber('')).toEqual(EMPTY_FULL_EXPECTATION);
        });
    });

    describe('failure cases', () => {
        it('should return original input if less than 10 digits', () => {
            const phoneNum = '1234';

            expect(parsePhoneNumber(phoneNum)).toEqual({
                readable: phoneNum,
                callable: '',
                isDialable: false,
            });
        });

        it('should return original input if more than 11 digits', () => {
            const phoneNum = '555345678912';
            expect(parsePhoneNumber(phoneNum)).toEqual({
                readable: phoneNum,
                callable: '',
                isDialable: false,
            });
        });

        it('should return original input if 11 digits without leading 1', () => {
            const phoneNum = '25553456789';
            expect(parsePhoneNumber(phoneNum)).toEqual({
                readable: phoneNum,
                callable: '',
                isDialable: false,
            });
        });

        it('should return original input if number is string with chars', () => {
            const str = 'NotANumberABC';
            expect(parsePhoneNumber(str)).toEqual({
                readable: str,
                callable: '',
                isDialable: false,
            });
        });

        it('should return original input if number is string with symbols', () => {
            const str = '---';
            expect(parsePhoneNumber(str)).toEqual({
                readable: str,
                callable: '',
                isDialable: false,
            });
        });

        it('should return original input if number contains letters', () => {
            const str = '1-800-FLOWERS';
            expect(parsePhoneNumber(str)).toEqual({
                readable: str,
                callable: '',
                isDialable: false,
            });
        });
    });
});
