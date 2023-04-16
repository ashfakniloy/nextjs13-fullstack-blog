import { prisma } from "@/lib/prisma";

export async function getSinglePost(postId: string) {
  // const createView = await prisma.post.update({
  //   where: {
  //     id: postId,
  //   },
  //   data: {
  //     views: { increment: 1 },
  //   },
  // });

  const response = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: {
        select: {
          username: true,
          id: true,
          profile: {
            select: {
              imageUrl: true,
            },
          },
        },
      },
      _count: {
        select: {
          views: true,
        },
      },
    },
  });

  // const post = JSON.parse(JSON.stringify(response));

  return { post: response };
}
