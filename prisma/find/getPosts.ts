import { PER_PAGE } from "@/config";
import { prisma } from "@/lib/prisma";

export async function getPosts(pageNumber: number, limitNumber: number) {
  const currentPage = Math.max(pageNumber || 1, 1);

  const count = await prisma.post.count();

  const response = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },

    take: limitNumber || PER_PAGE,
    skip: (currentPage - 1) * (limitNumber || PER_PAGE) || 0,

    include: {
      user: {
        select: {
          username: true,
          id: true,
        },
      },
      _count: {
        select: {
          comments: true,
          views: true,
        },
      },
      // likes: {
      //   include: {
      //     user: {
      //       select: {
      //         username: true,
      //         id: true,
      //         profile: {
      //           select: {
      //             imageUrl: true,
      //           },
      //         },
      //       },
      //     },
      //   },
      // },
      // _count: {
      //   select: {
      //     likes: true,
      //     // comments: true,
      //   },
      // },
    },
  });

  return { count, posts: response };
}

export async function getPostsByUserId(
  userId: string,
  pageNumber: number,
  limitNumber: number
) {
  const currentPage = Math.max(pageNumber || 1, 1);

  const count = await prisma.post.count({
    where: {
      userId: userId,
    },
  });

  const response = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },

    where: {
      userId: userId,
    },

    take: limitNumber || PER_PAGE,
    skip: (currentPage - 1) * (limitNumber || PER_PAGE) || 0,

    include: {
      user: {
        select: {
          username: true,
          id: true,
        },
      },
      _count: {
        select: {
          comments: true,
          views: true,
        },
      },
    },
  });

  return { count, posts: response };
}

export async function getPostsByUsername(
  username: string,
  pageNumber: number,
  limitNumber: number
) {
  const currentPage = Math.max(pageNumber || 1, 1);

  const count = await prisma.post.count({
    where: {
      user: {
        username: username,
      },
    },
  });

  const response = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },

    where: {
      user: {
        username: username,
      },
    },

    take: limitNumber || PER_PAGE,
    skip: (currentPage - 1) * (limitNumber || PER_PAGE) || 0,

    include: {
      user: {
        select: {
          username: true,
          id: true,
        },
      },
      _count: {
        select: {
          comments: true,
          views: true,
        },
      },
    },
  });

  return { count, posts: response };
}

export async function getPostsByCategory(
  categoryName: string,
  pageNumber: number,
  limitNumber: number
) {
  const currentPage = Math.max(pageNumber || 1, 1);

  const count = await prisma.post.count({
    where: {
      categoryName: categoryName,
    },
  });

  const response = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },

    where: {
      categoryName: categoryName,
    },

    take: limitNumber || PER_PAGE,
    skip: (currentPage - 1) * (limitNumber || PER_PAGE) || 0,

    include: {
      user: {
        select: {
          username: true,
          id: true,
        },
      },
      _count: {
        select: {
          comments: true,
          views: true,
        },
      },
    },
  });

  return { count, posts: response };
}

export async function getRelatedPosts(categoryName: string, limit: number) {
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

    where: {
      categoryName: categoryName,
    },

    take: limit,
    include: {
      user: {
        select: {
          username: true,
          id: true,
        },
      },
      _count: {
        select: {
          comments: true,
          views: true,
        },
      },
    },
  });

  return { posts: response };
}
