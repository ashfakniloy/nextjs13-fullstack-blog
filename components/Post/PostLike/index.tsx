import Image from "next/image";
import Link from "next/link";
import PostLikeButton from "./PostLikeButton";
import { getPostLikes } from "@/prisma/find/getPostLikes";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

async function PostLike({ postId }: { postId: string }) {
  const { likes, likesCount } = await getPostLikes(postId);

  const session = await getServerSession(authOptions);

  const hasLiked =
    likes?.find((like) => like.userId === session?.user.id) && true;

  return (
    <PostLikeButton
      postId={postId}
      hasLiked={hasLiked}
      session={session}
      likesCount={likesCount}
    >
      <div className="border-t border-gray-300 dark:border-gray-600 overflow-hidden max-h-[240px] overflow-y-auto scrollbar-thin scrollbar-track-gray-600/50 scrollbar-thumb-gray-500/50 ">
        {likes?.map((like, i) => (
          <Link key={i} href={`/user/${like.user.username}`}>
            <div
              className={`w-full flex items-center gap-2 p-2 text-xs hover:bg-gray-200 dark:hover:bg-gray-600 ${
                like.userId === session?.user.id ? "text-blue-400" : ""
              }`}
            >
              {like.user.profile?.imageUrl ? (
                <Image
                  src={like.user.profile.imageUrl}
                  alt="user image"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src="/images/blankUser.jpg"
                  alt="user image"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              )}
              {like.user.username}
            </div>
          </Link>
        ))}
      </div>
    </PostLikeButton>
  );
}

export default PostLike;
