import { Prisma, PrismaClient, User, Activation } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  async add(
    userData: Prisma.UserCreateInput,
    expiresAt: Date
  ): Promise<User & { activation: Activation | null }> {
    return prisma.user.create({
      data: {
        ...userData,
        activation: {
          create: {
            expiresAt,
          },
        },
      },
      include: {
        activation: true,
      },
    });
  },
  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        username,
      },
    });
  },
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },
  async delete(userUuid: string): Promise<User> {
    return prisma.user.delete({
      where: {
        uuid: userUuid,
      },
    });
  },
};
