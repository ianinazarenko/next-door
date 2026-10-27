import type { PrismaClient } from '@/generated/prisma';

import { mockDeep } from 'jest-mock-extended';

export const prisma = mockDeep<PrismaClient>();
