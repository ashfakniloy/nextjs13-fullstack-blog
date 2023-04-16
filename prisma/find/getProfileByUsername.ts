import { prisma } from "@/lib/prisma";

export async function getProfileByUsername(username: string | undefined) {
  const response = await prisma.profile.findFirst({
    where: {
      user: {
        username: username,
      },
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
