import { type DefaultSession } from 'next-auth';
import { ERole } from '@/utils/constants/users';

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
