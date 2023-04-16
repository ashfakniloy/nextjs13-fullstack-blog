import { prisma } from "@/lib/prisma";

export async function getCommentLikes(commentId: string) {
  const commentLikesCount = await prisma.commentLike.count({
    where: {
      commentId: commentId,
    },
  });

  const response = await prisma.commentLike.findMany({
    where: {
      commentId: commentId,
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
    },
  });

  return { commentsLikes: response, commentLikesCount };
}
