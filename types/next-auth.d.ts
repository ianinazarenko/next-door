import type { ERole } from '@/utils/constants/users';
import type {DefaultSession} from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            role: ERole;
        } & DefaultSession['user'];
    }

    interface User {
        role?: ERole;
    }
}

// declare module '@auth/core/adapters' {
//     interface AdapterUser {
//         role: ERole;
//     }
// }
