/**
 * Lightweight client-side check for HTML tags in user input.
 *
 * This is NOT a security feature - it's a UX helper to inform users that HTML tags
 * are not allowed before they submit the form. The real protection happens server-side
 * via `sanitize-html` library.
 *
 * Trade-off: This allows legitimate text with both '<' and '>' symbols used separately
 * (e.g., "5 < 10 and 20 > 15"), which is a rare but valid use case.
 */
export function hasHtmlTags(str: string | null | undefined): boolean {
    if (!str) return false;
    // Matches < followed by a letter (start tag) or / (end tag)
    return /<[a-z\/][\s\S]*>/i.test(str);
}
