import { prisma } from "@/lib/prisma";

export async function getPostLikes(postId: string) {
  const likesCount = await prisma.like.count({
    where: {
      postId: postId,
    },
  });

  const response = await prisma.like.findMany({
    where: {
      postId: postId,
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

  return { likes: response, likesCount };
}
