import { prisma } from "@/lib/prisma";

export async function getPopularPosts(limit: number) {
  const response = await prisma.post.findMany({
    orderBy: [
      {
        likes: {
          _count: "desc",
        },
      },
      {
        comments: {
          _count: "desc",
        },
      },
      {
        views: {
          _count: "desc",
        },
      },
    ],
    take: limit,
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  return {
    popularPosts: response,
  };
}

export async function getUsersPopularPosts(limit: number, username: string) {
  const response = await prisma.post.findMany({
    where: {
      user: {
        username: username,
      },
    },
    orderBy: [
      {
        likes: {
          _count: "desc",
        },
      },
      {
        comments: {
          _count: "desc",
        },
      },
      {
        views: {
          _count: "desc",
        },
      },
    ],
    take: limit,
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  return {
    usersPopularPosts: response,
  };
}
