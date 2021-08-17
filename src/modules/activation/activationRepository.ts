import { PrismaClient, Activation, User } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  async activate(uuid: string): Promise<Activation> {
    return prisma.activation.update({
      where: {
        uuid,
      },
      data: {
        status: 'ACTIVATED',
      },
    });
  },
  async findOne(uuid: string): Promise<Activation | null> {
    return prisma.activation.findUnique({
      where: {
        uuid,
      },
    });
  },
};
