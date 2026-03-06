import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const createOneProduct = async (data: any) => {
  const productdata: any = {
    name: data.name,
    description: data.description,
    price: data.price,
    discount: data.discount,
    inventory: data.inventory,
    images: {
      create: data.images,
    },

    category: {
      connectOrCreate: {
        where: { name: data.category },
        create: {
          name: data.category,
        },
      },
    },
    type: {
      connectOrCreate: {
        where: { name: data.type },
        create: {
          name: data.type,
        },
      },
    },
  };
  if (data.tags && data.tags.length > 0) {
    productdata.tags = {
      connectOrCreate: data.tags.map((tagName: string) => ({
        where: { name: tagName },
        create: {
          name: tagName,
        },
      })),
    };
  }
  return prisma.product.create({ data: productdata });
};
