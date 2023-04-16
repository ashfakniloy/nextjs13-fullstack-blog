import { prisma } from "@/lib/prisma";

export async function getComments(postId: string) {
  const commentsCount = await prisma.comment.count({
    where: {
      postId: postId,
    },
  });

  const response = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    // take: 2,
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
        // include: {
        //   profile: {
        //     select: {
        //       imageUrl: true,
        //     },
        //   },
        // },
      },
    },
  });

  // const comments = JSON.parse(JSON.stringify(response));

  return {
    commentsCount,
    comments: response,
  };
}
