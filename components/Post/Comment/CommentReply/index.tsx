import { getCommentReplies } from "@/prisma/find/getCommentReplies";
import Link from "next/link";
import Image from "next/image";
import { getTimeDistance } from "@/utils/getTimeDistance";
import ReplyWrapper from "./ReplyWrapper";
import CommentOption from "../CommentOption";
import type { Session } from "next-auth";

async function CommentReply({
  commentId,
  postId,
  authorId,
  session,
}: {
  commentId: string;
  postId: string;
  authorId: string;
  session: Session | null;
}) {
  const { commentRepliesCount, commentReplies } = await getCommentReplies(
    commentId
  );

  return (
    <ReplyWrapper
      commentId={commentId}
      postId={postId}
      commentRepliesCount={commentRepliesCount}
    >
      {commentReplies.map((reply, i) => (
        <div key={i} className="pt-2 flex gap-3">
          <div className="">
            {reply.user.profile?.imageUrl ? (
              <Image
                src={reply.user.profile.imageUrl}
                alt="user picture"
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
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold">
              <Link
                href={`/user/${reply.user.username}`}
                className="hover:text-blue-800 dark:hover:text-blue-500"
              >
                {reply.user.username}
              </Link>
            </p>
            <div className="">
              <p className="">{reply.commentReply}</p>
              <div className="flex justify-between items-start">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getTimeDistance(reply.createdAt)}
                </p>
                {(session?.user.id === reply.userId ||
                  session?.user.id === authorId) && (
                  <CommentOption commentReplyId={reply.id} type="Reply" />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </ReplyWrapper>
  );
}

export default CommentReply;
