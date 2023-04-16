import Image from "next/image";
import Link from "next/link";
import CommentLikeButton from "./CommentLikeButton";
import { getPostLikes } from "@/prisma/find/getPostLikes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getCommentLikes } from "@/prisma/find/getCommentsLikes";

async function CommentLike({ commentId }: { commentId: string }) {
  const { commentsLikes, commentLikesCount } = await getCommentLikes(commentId);

  const session = await getServerSession(authOptions);

  const hasLiked =
    commentsLikes?.find((like) => like.userId === session?.user.id) && true;

  return (
    <CommentLikeButton
      commentId={commentId}
      hasLiked={hasLiked}
      session={session}
      likesCount={commentLikesCount}
    >
      <div className="border-t border-gray-300 dark:border-gray-600 overflow-hidden max-h-[240px] overflow-y-auto scrollbar-thin scrollbar-track-gray-600/50 scrollbar-thumb-gray-500/50 ">
        {commentsLikes?.map((like, i) => (
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
    </CommentLikeButton>
  );
}

export default CommentLike;
