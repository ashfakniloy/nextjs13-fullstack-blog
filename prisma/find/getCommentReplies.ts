import { prisma } from "@/lib/prisma";

export async function getCommentReplies(commentId: string) {
  const commentRepliesCount = await prisma.commentReply.count({
    where: {
      commentId: commentId,
    },
  });

  const response = await prisma.commentReply.findMany({
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

  return {
    commentRepliesCount,
    commentReplies: response,
  };
}
