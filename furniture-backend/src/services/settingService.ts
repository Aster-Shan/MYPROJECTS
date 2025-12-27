import { PrismaClient } from '../../generated/prisma';
const prisma = new PrismaClient();

export const getSettingStatus = async (key: string) => {
  return prisma.setting.findUnique({
    where: { key },
  });
};

export const createOrUpdate = async (key: string, value: string) => {
  //upsert create if already, update
  return prisma.setting.upsert({
    where: { key },
    update: {
      value,
    },
    create: { key, value },
  });
};
