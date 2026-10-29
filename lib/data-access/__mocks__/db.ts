import type { PrismaClient } from '@/generated/prisma/client';

import { mockDeep } from 'jest-mock-extended';

export const prisma = mockDeep<PrismaClient>();
