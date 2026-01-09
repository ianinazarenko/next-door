import { prepareSpec } from '@/utils/helpers/data-utils';

const RES = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
];

const ALL_LABEL = 'All';
const ALL_OPTION = { value: '', label: ALL_LABEL };

const OPTIONS = {
    valueName: 'value' as const,
    labelName: 'label' as const,
};

describe('prepareSpec', () => {
    describe('happy path', () => {
        it('should return correct array', () => {
            expect(prepareSpec(RES, OPTIONS)).toEqual([ALL_OPTION, ...RES]);
        });

        it('should return correct array without all option', () => {
            expect(prepareSpec(RES, { ...OPTIONS, hasAllOption: false })).toEqual(RES);
        });

        it('should return correct array with custom all option', () => {
            const allLabel = 'Reset';
            expect(prepareSpec(RES, { ...OPTIONS, allLabel })).toEqual([{ label: allLabel, value: '' }, ...RES]);
        });

        it('should return correct array with numbers', () => {
            const res = [{ value: 1, label: '1' }];
            const result = [{ value: '1', label: '1' }];
            expect(prepareSpec(res, { ...OPTIONS, hasAllOption: false })).toEqual(result);
        });
    });

    describe('boundary cases', () => {
        it('should return array with all option if res is empty array', () => {
            const res: { value: string; label: string }[] = [];
            expect(prepareSpec(res, OPTIONS)).toEqual([ALL_OPTION]);
        });
    });

    describe('failure cases', () => {
        it('should return empty array if no res', () => {
            expect(prepareSpec(undefined, OPTIONS)).toEqual([]);
        });

        it('should return empty array if res is not an array', () => {
            // @ts-expect-error – error for test case
            expect(prepareSpec('123', OPTIONS)).toEqual([]);
        });
    });

    describe('corner cases', () => {
        it('should handle array with undefined values', () => {
            const res = [{ value: undefined, label: 'test' }] as unknown as typeof RES;
            const result = [{ value: 'undefined', label: 'test' }];
            expect(prepareSpec(res, { ...OPTIONS, hasAllOption: false })).toEqual(result);
        });
    });
});
