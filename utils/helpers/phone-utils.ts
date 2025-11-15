/**
 * Formats a phone number from a string of digits to a more readable format
 * @param phoneNumber - The phone number as a string of digits (e.g., "15553456789")
 * @returns Formatted phone number (e.g., "+1 (555) 345-67-89") or empty string if input is invalid
 * for numbers that are not 10 or 11 digits long @returns input as is
 */
export function formatPhoneNumber(phoneNumber: string | null | undefined): string {
    if (!phoneNumber) return '';

    // Remove all non-digit characters and spaces
    const cleaned = String(phoneNumber).replace(/[\s\D]/g, '');

    if (!cleaned) return '';

    // Check if the number starts with 1 (country code for US/Canada)
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
        return `+${cleaned[0]} (${cleaned.substring(1, 4)}) ${cleaned.substring(4, 7)}-${cleaned.substring(7, 9)}-${cleaned.substring(9)}`;
    }

    // For numbers without country code
    if (cleaned.length === 10) {
        return `+1 (${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 8)}-${cleaned.substring(8)}`;
    }

    return phoneNumber;
}
