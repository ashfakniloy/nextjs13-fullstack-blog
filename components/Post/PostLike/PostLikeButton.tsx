"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";
import { HandThumbUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
import useToggle from "@/hooks/useToggle";
import { getPluralize } from "@/utils/getPluralize";

function PostLikeButton({
  postId,
  likesCount,
  session,
  hasLiked,
  children,
}: {
  postId?: string;
  commentId?: string;
  likesCount: number;
  session: Session | null;
  hasLiked: boolean | undefined;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [like, setLike] = useState(hasLiked);

  const { node, toggle: showLikes, setToggle: setShowLikes } = useToggle();

  useEffect(() => {
    hasLiked && setLike(true);

    return () => setLike(false);
  }, [hasLiked]);

  const url = `/api/post/like?postId=${postId}`;

  const handleLike = async () => {
    setLike(true);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      console.log("liked", data);
    } else {
      setLike(false);

      console.log("like failed", data);
    }
  };

  const handleUnlike = async () => {
    setLike(false);

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json(",
      },
    });

    const data = await res.json();

    if (res.ok) {
      console.log("unliked", data);
    } else {
      setLike(true);
      console.log("unlike failed", data);
    }
  };

  const handleClick = async () => {
    if (hasLiked) {
      await handleUnlike();
      router.refresh();
    } else {
      await handleLike();
      router.refresh();
    }
  };

  return (
    <div ref={node} className="flex items-center text-sm relative">
      {session && (
        <button
          className={`font-bold active:scale-125 h-6 w-6 ${
            like ? "text-blue-500" : "text-emerald-400"
          } ${likesCount > 0 ? "mr-2" : "mr-4"}`}
          onClick={handleClick}
        >
          <HandThumbUpIcon />
        </button>
      )}

      {likesCount > 0 && (
        <div>
          <button
            className="mr-4 text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-500"
            onClick={() => setShowLikes(!showLikes)}
          >
            {getPluralize(likesCount, "Like", "s")}
          </button>

          {showLikes && (
            <div className="absolute left-0  bg-gray-50 dark:bg-custom-gray3 top-[30px] w-full min-w-[250px] border border-gray-300 dark:border-gray-600 shadow-md z-10">
              <div className="flex items-center justify-between py-2 px-3">
                <p className="self-center">All Likes</p>
                <button
                  className="h-6 w-6 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-600/50 dark:hover:bg-gray-600 p-1"
                  onClick={() => setShowLikes(false)}
                >
                  <XMarkIcon />
                </button>
              </div>
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PostLikeButton;
