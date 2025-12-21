import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@/generated/prisma';

export const prisma = mockDeep<PrismaClient>();
