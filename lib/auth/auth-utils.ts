import 'server-only';
import { GitHubEmail } from '@/types/auth';

const API = 'https://api.github.com/user/emails';

export async function verifyGitHubEmail(token: string): Promise<boolean> {
    try {
        const res = await fetch(API, {
            headers: {
                Authorization: `Bearer ${token}`,
                'User-Agent': 'NextDoor-App',
            },
            next: { revalidate: 0 },
        });

        if (!res.ok) return false;

        const emails = (await res.json()) as GitHubEmail[];

        if (!Array.isArray(emails)) {
            console.error('[verifyGitHubEmail] Unexpected response format (not an array)');
            return false;
        }

        return Boolean(emails.find((e) => e.primary && e.verified));
    } catch (error) {
        console.error('Error verifying GitHub email:', error);
        return false;
    }
}
