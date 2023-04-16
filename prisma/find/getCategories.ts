import { prisma } from "@/lib/prisma";

export async function getCategories() {
  const response = await prisma.category.findMany({
    select: {
      name: true,
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });

  return {
    categories: response,
  };
}
