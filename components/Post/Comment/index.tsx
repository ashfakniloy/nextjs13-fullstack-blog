import { getComments } from "@/prisma/find/getComments";
import CommentForm from "./CommentForm";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import CommentLike from "./CommentLike";
import { getTimeDistance } from "@/utils/getTimeDistance";
import CommentRepliesList from "./CommentReply";
import CommentReply from "./CommentReply";
import CommentOption from "./CommentOption";
import CommentWrapper from "./CommentWrapper";

async function Comment({
  postId,
  authorId,
}: {
  postId: string;
  authorId: string;
}) {
  const session = await getServerSession(authOptions);

  const data = await getComments(postId);
  const totalComments = data.commentsCount;
  const comments = data.comments;

  // console.log("comments", comments);

  return (
    <CommentWrapper>
      <div id="comments" className="mr-20">
        {session ? (
          <CommentForm postId={postId} />
        ) : (
          <Link href="/signin" className="text-blue-500">
            Sign in to comment
          </Link>
        )}
        <div className="mt-3">
          <p className="">
            {totalComments > 0
              ? totalComments > 1
                ? `${totalComments} comments`
                : `${totalComments} comment`
              : "No comments yet"}
          </p>

          <div className="mt-2 space-y-5">
            {comments.map((comment, i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-custom-gray2 shadow-md p-5"
              >
                <div className="flex gap-3">
                  <div className="">
                    {comment.user.profile?.imageUrl ? (
                      <Image
                        src={comment.user.profile.imageUrl}
                        alt={comment.user.username}
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
                  <div className="flex-1">
                    <p className="text-sm font-semibold">
                      <Link
                        href={`/user/${comment.user.username}`}
                        className="hover:text-blue-800 dark:hover:text-blue-500"
                      >
                        {comment.user.username}
                      </Link>
                    </p>
                    <div className="">
                      <p className="">{comment.comment}</p>
                      <div className="relative">
                        <div className="flex items-center relative text-sm">
                          {/* @ts-expect-error Server Component */}
                          <CommentLike commentId={comment.id} />

                          <p className="ml-14 text-gray-600 dark:text-gray-400">
                            {getTimeDistance(comment.createdAt)}
                          </p>

                          {(session?.user.id === comment.userId ||
                            session?.user.id === authorId) && (
                            <div className="ml-5 absolute bottom-0 right-0">
                              <CommentOption
                                commentId={comment.id}
                                type="Comment"
                              />
                            </div>
                          )}
                        </div>

                        {/* @ts-expect-error Server Component */}
                        <CommentReply
                          commentId={comment.id}
                          postId={postId}
                          authorId={authorId}
                          session={session}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="mt-3 flex justify-center">
          <button className="px-5 py-1.5 rounded text-sm font-bold bg-blue-600 text-gray-50">
            View more comments
          </button>
        </div> */}
        </div>
      </div>
    </CommentWrapper>
  );
}

export default Comment;
