/**
 * Parses a phone number string and provides clean, formatted, and validated versions.
 *
 * @param {string | null | undefined} value - The raw phone number input.
 * @returns An object containing:
 *  - `readable`: A user-friendly formatted string (e.g., "+1 (555) 123-4567") or the original input if not valid.
 *  - `callable`: A string suitable for `tel:` links (e.g., "+15551234567"). It's an empty string if not dialable.
 *  - `isDialable`: A boolean indicating if the number is valid and can be called.
 */
export function parsePhoneNumber(value: string | null | undefined): {
    readable: string;
    callable: string;
    isDialable: boolean;
} {
    if (!value) {
        return { readable: '', callable: '', isDialable: false };
    }

    const cleaned = value.trim().replace(/\D/g, '');

    const isFullNumber = cleaned.length === 10 || (cleaned.length === 11 && cleaned.startsWith('1'));
    const isEmergencyNumber = cleaned.length === 3;
    const isDialable = isFullNumber || isEmergencyNumber;

    if (!isDialable) {
        return {
            readable: value, // Return original on failure
            callable: '', // Not callable
            isDialable: false,
        };
    }

    // It is a dialable number
    if (isFullNumber) {
        const number = cleaned.length === 11 ? cleaned.slice(1) : cleaned;
        const callableNumber = `+1${number}`;

        return {
            readable: `+1 (${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`, // "+1 (555) 123-4567"
            callable: callableNumber,
            isDialable: true,
        };
    } else {
        // isEmergencyNumber
        return {
            readable: cleaned,
            callable: cleaned,
            isDialable: true,
        };
    }
}
