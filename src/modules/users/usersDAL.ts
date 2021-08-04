import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  async findOne(findBy: Prisma.UserWhereUniqueInput) {
    return prisma.user.findUnique({ where: findBy });
  },
  async addUser(userData: Prisma.UserCreateInput) {
    return prisma.user.create({
      data: userData,
    });
  },
};
