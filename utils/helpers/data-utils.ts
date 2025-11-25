import { ISpec } from '@/types/common';

// General specs prepare function
export function prepareSpec<T extends Record<string, string | number>>(
    res: T[] | undefined,
    {
        valueName,
        labelName,
        hasAllOption = true,
        allLabel = 'All',
    }: {
        valueName: keyof T;
        labelName: keyof T;
        hasAllOption?: boolean;
        allLabel?: string;
    }
): ISpec[] {
    if (!res || !Array.isArray(res)) return [];

    const mapped = res.map((item) => ({
        value: String(item[valueName]),
        label: String(item[labelName]),
    }));

    return hasAllOption ? [{ label: allLabel, value: '' }, ...mapped] : mapped;
}
