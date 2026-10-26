const AVATAR_COLORS = [
    'var(--avatar-color-1)',
    'var(--avatar-color-2)',
    'var(--avatar-color-3)',
    'var(--avatar-color-4)',
    'var(--avatar-color-5)',
    'var(--avatar-color-6)',
] as const;

/**
 * Extracts the first letter from a user's name
 * @param name - User's name (e.g., "John Doe" or "Maria")
 * @returns First letter uppercased (e.g., "J", "M") or "?" as fallback
 */
export function getInitial(name: string | null | undefined): string {
    if (!name) return '?';

    const trimmed = name.trim();
    if (!trimmed) return '?';

    return trimmed[0].toUpperCase();
}

/**
 * Generates a deterministic color based on user identifier
 * Uses simple hash function to ensure same user always gets same color
 * @param identifier - User ID or index (number or string)
 * @returns Theme-aware CSS color from AVATAR_COLORS palette
 */
export function getUserColor(identifier: number | string | null | undefined): string {
    if (identifier === null || identifier === undefined) {
        return AVATAR_COLORS[0];
    }

    const str = String(identifier);
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }

    const index = Math.abs(hash) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
}
