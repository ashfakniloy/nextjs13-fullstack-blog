"use client";

import { useState } from "react";
import CommentsReplyForm from "./CommentReplyForm";

function ReplyWrapper({
  commentId,
  postId,
  commentRepliesCount,
  children,
}: {
  commentId: string;
  postId: string;
  commentRepliesCount: number;
  children: React.ReactNode;
}) {
  const [openReplyForm, setOpenReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="relative">
      <button
        className="absolute top-[-22px] left-24 text-sm"
        onClick={() => setOpenReplyForm(!openReplyForm)}
      >
        Reply
      </button>

      {openReplyForm && (
        <div className="pt-2">
          <CommentsReplyForm
            postId={postId}
            setOpenReply={setOpenReplyForm}
            setShowReplies={setShowReplies}
            commentId={commentId}
          />
        </div>
      )}

      {showReplies && children}

      <div className="pt-2 flex flex-col justify-center ">
        {commentRepliesCount > 0 &&
          (!showReplies ? (
            <button
              className="text-sm text-gray-900 dark:text-gray-300"
              onClick={() => setShowReplies(true)}
            >
              {commentRepliesCount > 1
                ? `View ${commentRepliesCount} replies`
                : `View ${commentRepliesCount} reply`}
            </button>
          ) : (
            <button
              className="text-sm text-gray-900 dark:text-gray-300"
              onClick={() => setShowReplies(false)}
            >
              Hide {commentRepliesCount > 1 ? "replies" : "reply"}
            </button>
          ))}
      </div>
    </div>
  );
}

export default ReplyWrapper;
