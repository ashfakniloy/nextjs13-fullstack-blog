import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body) {
    return NextResponse.json(
      { error: "Content can not be empty" },
      { status: 400 }
    );
  }

  if (Object.keys(body).length === 0) {
    return NextResponse.json(
      { error: "Content cannot be empty" },
      { status: 400 }
    );
  }

  if (Object.values(body).includes("")) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const { searchParams } = request.nextUrl;

  const changeType = searchParams.get("changeType");

  if (typeof changeType !== "string") {
    return NextResponse.json({ error: "Invalid Searchparam" }, { status: 400 });
  }

  const accountResponse = await prisma.user.findUnique({
    where: {
      // email: session.user.email,
      id: session.user.id,
    },
  });

  if (changeType === "username") {
    const { username, password } = body;

    if (accountResponse?.password !== password) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 400 }
      );
    }

    const usernameExists = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (usernameExists) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    try {
      const response = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: { username: username },
      });

      return NextResponse.json({
        message: "Username Changed successfully",
        response,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 400 });
    }
  }

  if (changeType === "email") {
    const { email, password } = body;

    if (accountResponse?.password !== password) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 400 }
      );
    }

    const emailExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    try {
      const response = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: { email: email },
      });

      return NextResponse.json({
        message: "Email Changed successfully",
        response,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 400 });
    }
  }

  if (changeType === "password") {
    const { currentPassword, newPassword } = body;

    if (accountResponse?.password !== currentPassword) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 400 }
      );
    }

    try {
      const response = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: { password: newPassword },
      });

      return NextResponse.json({
        message: "Password Changed successfully",
        response,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 400 });
    }
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body) {
    return NextResponse.json(
      { error: "Content can not be empty" },
      { status: 400 }
    );
  }

  if (Object.keys(body).length === 0) {
    return NextResponse.json(
      { error: "Content cannot be empty" },
      { status: 400 }
    );
  }

  if (Object.values(body).includes("")) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const { password } = body;

  const userCheckResponse = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!userCheckResponse) {
    return NextResponse.json(
      { error: "Unauthorized, User not found" },
      { status: 404 }
    );
  }

  if (userCheckResponse.password !== password) {
    return NextResponse.json(
      { error: "Unauthorized, Passwords don't match" },
      { status: 400 }
    );
  }

  const responseProfileImage = await prisma.profile.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      imageId: true,
    },
  });

  const responsePostsImages = await prisma.post.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      imageId: true,
    },
  });

  const postsImages = responsePostsImages.flatMap((image) => image.imageId);

  try {
    const response = await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });

    if (responseProfileImage?.imageId) {
      try {
        const profileImageDelete = await cloudinary.v2.uploader.destroy(
          responseProfileImage?.imageId
        );

        NextResponse.json({ success: profileImageDelete }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
      }
    }

    if (postsImages?.length) {
      try {
        const postsImagesDelete = await cloudinary.v2.api.delete_resources(
          postsImages
        );

        NextResponse.json({ success: postsImagesDelete }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
      }
    }

    return NextResponse.json(
      { success: "account deleted", response },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "account delete failed" },
      { status: 400 }
    );
  }
}
