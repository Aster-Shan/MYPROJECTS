import { PrismaClient } from '../../generated/prisma';
const prisma = new PrismaClient();
export type PostAgs = {
  title: string;
  content: string;
  body: string;
  image: string;
  authorId: number;
  category: string;
  type: string;
  tags: string[]; //tag is optional
};
export const createOnePost = async (postData: PostAgs) => {
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
      },
      create: {
        name: postData.type,
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
