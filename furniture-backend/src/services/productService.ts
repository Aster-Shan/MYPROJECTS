import { prisma } from './prismaClient';
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

export const getProductById = async (id: number) => {
  return prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
    },
  });
};
export const updateOneProduct = async (productId: number, data: any) => {
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
      set: [],
      connectOrCreate: data.tags.map((tagName: string) => ({
        where: { name: tagName },
        create: {
          name: tagName,
        },
      })),
    };
  }
  if (data.images && data.images.length > 0) {
    productdata.images = {
      deleteMany: {},
      create: data.images,
    };
  }
  return prisma.product.update({
    where: { id: productId },
    data: productdata,
  });
};
// `data` = new input coming from the controller/request body.
// It contains user-provided values like name, price, category, tags, and uploaded images.
//
// `productdata` = the formatted object used for the Prisma update query.
// data in database
//
// Example:
// data.images → plain array from request
// productdata.images → Prisma relation format (create / deleteMany)

// If new images are uploaded:
// 1. Delete all existing images for this product (deleteMany)
// 2. Create new image records using uploaded files (create)
// This replaces old images instead of appending new ones.

export const deleteProductById = async (id: number) => {
  return prisma.product.delete({
    where: { id },
  });
};
export const getProductWithRelations = async (id: number) => {
  return prisma.product.findUnique({
    where: { id },
    omit: { categoryId: true, typeId: true, createdAt: true, updatedAt: true },
    include: {
      images: {
        select: {
          id: true,
          path: true,
        },
      },
    },
    // select: {
    //   id: true,
    //   title: true,
    //   content: true,
    //   body: true,
    //   image: true,
    //   updatedAt: true,
    //   author: {
    //     select: {
    //       firstName: true,
    //       lastName: true,
    //       // fullName: true,
    //     },
    //   },
    //   category: {
    //     select: {
    //       name: true,
    //     },
    //   },
    //   type: {
    //     select: {
    //       name: true,
    //     },
    //   },
    //   tags: {
    //     select: {
    //       name: true,
    //     },
    //   },
    // },
  });
};
export const getProductsList = async (options: any) => {
  return prisma.product.findMany(options);
};
export const getCategoryList = async () => {
  return prisma.category.findMany();
};
export const getTypeList = async () => {
  return prisma.type.findMany();
};
