import { prisma } from "@/lib/prisma";

export async function getProfile(userId: string | undefined) {
  const response = await prisma.profile.findFirst({
    where: {
      userId: userId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  return { profile: response };
}
