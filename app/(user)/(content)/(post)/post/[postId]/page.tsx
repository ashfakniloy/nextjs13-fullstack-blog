import Image from "next/image";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/solid";
import Comment from "@/components/Post/Comment";
import { getSinglePost } from "@/prisma/find/getSinglePost";
import parser from "html-react-parser";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import OptionButton from "@/components/Post/OptionButton";
import { getTimeDistance } from "@/utils/getTimeDistance";
import PostLike from "@/components/Post/PostLike";
import ViewCount from "@/components/Post/ViewCount";
import { getPluralize } from "@/utils/getPluralize";

type Props = {
  params: {
    category: string;
    postId: string;
  };
};

export const dynamic = "force-dynamic";

async function SinglePostPage({ params: { postId } }: Props) {
  const session = await getServerSession(authOptions);

  const { post } = await getSinglePost(postId);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <ViewCount postId={postId} />

      <div className="mb-4 text-gray-700 dark:text-gray-300 ">
        <Link
          href={`/category/${post.categoryName}`}
          className="hover:text-blue-800 dark:hover:text-blue-500 capitalize"
        >
          {post.categoryName}
        </Link>
      </div>

      <div className="">
        <h1 className="text-4xl text-gray-900 dark:text-gray-50 font-montserrat font-bold">
          {post.title}
        </h1>
        <div className="mt-2 flex items-center gap-6">
          <div className=" flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="">
                {post.user.profile?.imageUrl ? (
                  <Image
                    src={post.user.profile.imageUrl}
                    alt="user image"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src="/images/blankUser.jpg"
                    alt="user image"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                )}
              </div>

              <p className="">
                By{" "}
                <Link href={`/user/${post.user.username}`}>
                  <span className="hover:text-blue-800 dark:hover:text-blue-500">
                    {post.user.username}
                  </span>
                </Link>
              </p>
            </div>
            <p className="">{getTimeDistance(post.createdAt)}</p>
          </div>
          {session?.user.id === post.user.id && (
            <OptionButton
              title={post.title}
              postId={post.id}
              imageId={post.imageId}
              redirectAfterDelete={"/"}
            />
          )}
        </div>

        <div className="mt-5 h-[470px] relative">
          <Image
            src={post.imageUrl}
            alt="image"
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-6">{parser(post.article)}</div>

        <div className="mt-8 flex items-center font-semibold text-gray-700 dark:text-gray-300">
          {/* <div className="flex items-center gap-2">
            <HandThumbUpIcon className="h-7 w-7 text-blue-600" />
            <p className="">12 Likes</p>
          </div> */}
          {/* @ts-expect-error Server Component */}
          <PostLike postId={post.id} />
          {post._count.views > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <EyeIcon className="h-6 w-6 text-gray-600" />
              <p className="">{getPluralize(post._count.views, "View", "s")}</p>
            </div>
          )}
        </div>

        <div className="mt-5">
          {/* @ts-expect-error Server Component */}
          <Comment postId={postId} authorId={post.userId} />
        </div>
      </div>
    </div>
  );
}

export default SinglePostPage;
