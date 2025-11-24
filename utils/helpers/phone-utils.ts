/**
 * Formats a US/Canada phone number
 * @param phoneNumber - The phone number as a string (10-11 digits, no formatting)
 * @returns Formatted phone number in international format or original string if invalid
 *
 * @example
 * formatPhoneNumber('15551234567') // returns '+1 (555) 123-4567'
 * formatPhoneNumber('5551234567')  // returns '+1 (555) 123-4567'
 * formatPhoneNumber('911')         // returns '911'
 * formatPhoneNumber('123')         // returns '123' (invalid length)
 */
export function formatPhoneNumber(phoneNumber: string | null | undefined): string {
    if (!phoneNumber) return '';

    const cleaned = String(phoneNumber).replace(/\D/g, '');

    const length = cleaned.length;

    // Handle emergency numbers
    if (length === 3) {
        return cleaned;
    }

    // Validate length (10 digits + optional country code 1)
    const isValidLength = cleaned.length === 10 || (cleaned.length === 11 && cleaned.startsWith('1'));
    if (!isValidLength) {
        return cleaned; // Return original cleaned input
    }

    // Extract components
    const number = cleaned.length === 11 ? cleaned.slice(1) : cleaned;
    return `+1 (${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;
}
