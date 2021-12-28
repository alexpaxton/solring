import { PrismaClient } from '@prisma/client'

export const prisma: PrismaClient = new PrismaClient()

// if (process.env.NODE_ENV === 'development') global.prisma = prisma