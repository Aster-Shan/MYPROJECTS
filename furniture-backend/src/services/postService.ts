import { prisma } from './prismaClient';
export type PostArgs = {
  title: string;
  content: string;
  body: string;
  image: string;
  authorId: number;
  category: string;
  type: string;
  tags: string[]; //tag is optional
};
export const createOnePost = async (postData: PostArgs) => {
  let data: any = {
    title: postData.title,
    content: postData.content,
    body: postData.body,
    image: postData.image,
    author: {
      connect: { id: postData.authorId }, //connection in prisma
    },
    category: {
      // connection is prisma
      connectOrCreate: {
        //create if not exit or connect
        where: { name: postData.category }, ///update so where
        create: {
          //create
          name: postData.category,
        },
      },
    },
    type: {
      connectOrCreate: {
        where: { name: postData.type },
        create: {
          name: postData.type,
        },
      },
    },
  };
  if (postData.tags && postData.tags.length > 0) {
    data.tags = {
      connectOrCreate: postData.tags.map((tagName) => ({
        where: { name: tagName },

        create: {
          name: tagName,
        },
      })),
    };
  }
  return prisma.post.create({
    data,
  });
};

export const getPostById = async (id: number) => {
  return prisma.post.findUnique({
    where: { id },
  });
};
export const deleteOnePost = async (id: number) => {
  return prisma.post.delete({
    where: { id },
  });
};
export const getPostWithRelations = async (id: number) => {
  return prisma.post.findUnique({
    where: { id },
    //omit: { createdAt: true },
    select: {
      id: true,
      title: true,
      content: true,
      body: true,
      image: true,
      updatedAt: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
          fullName: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      type: {
        select: {
          name: true,
        },
      },
      tags: {
        select: {
          name: true,
        },
      },
    },
  });
};
export const getPostsList = async (options: any) => {
  return prisma.post.findMany(options);
};
