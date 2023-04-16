import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const imageId = searchParams.get("imageId");

  if (typeof imageId !== "string") {
    return NextResponse.json({ error: "Invalid Searchparam" }, { status: 400 });
  }

  // return NextResponse.json({ success: imageId }, { status: 200 });

  try {
    const response = await cloudinary.v2.uploader.destroy(imageId);
    // const res = await cloudinary.uploader.destroy(
    //   imageId,
    //   function (error, result) {
    //     console.log(result, error);
    //   }
    // );
    // const res = await cloudinary.uploader.destroy(
    //   "nextjs13-fullstack-blog/n1utbmtwl0rw2ibstvx7"
    // );

    if (response.result === "ok") {
      return NextResponse.json({ response }, { status: 200 });
    } else {
      return NextResponse.json({ response }, { status: 400 });
    }

    // return NextResponse.json({ result }, { status: 200 });

    // if (result === "ok") {
    //   return NextResponse.json({ result }, { status: 200 });
    // } else {
    //   return NextResponse.json({ result }, { status: 400 });
    // }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
