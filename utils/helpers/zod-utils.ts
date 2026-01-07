import { z } from 'zod';

/**
 * Extracts and formats the first validation error from a Zod error.
 * Useful for displaying a single user-friendly error message in forms.
 *
 * @param error - A ZodError instance
 * @returns Formatted error message (e.g., "title: String must contain at least 1 character(s)")
 */
export function getFirstZodErrorMessage(error: z.ZodError): string | undefined {
    if (error.issues.length === 0) return undefined;
    const issue = error.issues[0];

    const fieldName = issue.path.join('.');
    return fieldName ? `${fieldName}: ${issue.message}` : issue.message;
}
