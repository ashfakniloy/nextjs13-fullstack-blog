import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const commentId = searchParams.get("commentId");

  if (typeof commentId !== "string") {
    return NextResponse.json({ error: "Invalid Searchparam" }, { status: 400 });
  }

  try {
    const response = await prisma.commentLike.create({
      data: {
        user: {
          connect: {
            id: session.user.id,
          },
        },
        comment: {
          connect: {
            id: commentId,
          },
        },
      },
      include: {
        comment: {
          include: {
            commentsLikes: true,
          },
        },
      },

      // data: {
      //   user: {
      //     connect: {
      //       id: session.user.id,
      //     },
      //   },
      //   comment: {
      //     connect: {
      //       id: commentId,
      //     },
      //   },
      // },
      // include: {
      //   post: {
      //     select: {
      //       likes: true,
      //     },
      //   },
      // },
    });

    return NextResponse.json({
      message: "Comment Liked Successfully",
      response,
    });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  const { searchParams } = req.nextUrl;
  const commentId = searchParams.get("commentId");

  if (typeof commentId !== "string") {
    return NextResponse.json({ error: "Invalid Searchparam" }, { status: 400 });
  }

  try {
    const response = await prisma.commentLike.delete({
      where: {
        commentId_userId: {
          userId: session.user.id,
          commentId: commentId,
        },
      },
      select: {
        comment: {
          select: {
            commentsLikes: true,
          },
        },
      },
    });

    // console.log("rspns", response);

    // const filteredRes = response.post.likes.filter(
    //   (like) => like.userId !== session.user.id
    // );

    return NextResponse.json({
      message: "Unliked Comment Successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
