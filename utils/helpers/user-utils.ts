/**
 * Avatar color palette - blue/gray tones for consistency
 */
const AVATAR_COLORS = [
    '#4A90E2', // Sky Blue
    '#5D6D7E', // Steel Gray
    '#5DADE2', // Light Blue
    '#34495E', // Dark Slate
    '#7F8C8D', // Gray Blue
    '#2E86AB', // Ocean Blue
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
 * @returns Hex color from AVATAR_COLORS palette
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
