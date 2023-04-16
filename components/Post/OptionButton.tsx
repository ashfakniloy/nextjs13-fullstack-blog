"use client";

import useToggle from "@/hooks/useToggle";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function OptionButton({
  title,
  postId,
  imageId,
  redirectAfterDelete,
}: {
  title: string;
  postId: string;
  imageId: string;
  redirectAfterDelete?: string;
}) {
  const { node, toggle: showOptions, setToggle: setShowOptions } = useToggle();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [disableDelete, setDisableDelete] = useState(false);
  const [postDeleted, setPostDeleted] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    console.log("delete postid", postId);
    setDisableDelete(true);

    const toastDeletePost = toast.loading("Loading...");

    const url = `/api/post?postId=${postId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Post Deleted", {
        id: toastDeletePost,
      });
      router.refresh();
      redirectAfterDelete && router.replace(redirectAfterDelete);
      console.log("success", data);
    } else {
      toast.error("Something went wrong", {
        id: toastDeletePost,
      });
      console.log("error", data);
    }

    setShowDeleteModal(false);
    setDisableDelete(false);
    setPostDeleted(true);
  };

  useEffect(() => {
    const deletcloudinaryimage = async () => {
      const response = await fetch(`/api/image?imageId=${imageId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("success deleted cloudinary image", data);
      } else {
        console.log("error deleted cloudinary image", data);
      }
    };

    imageId && postDeleted && deletcloudinaryimage();

    return () => setPostDeleted(false);
  }, [postDeleted]);

  return (
    <div className="">
      <div ref={node} className="relative justify-between">
        <button
          className="self-end p-1 hover:bg-gray-300/50 dark:hover:bg-gray-700 rounded-full"
          onClick={() => setShowOptions(!showOptions)}
        >
          <EllipsisHorizontalIcon className="h-6 w-6" />
        </button>

        {showOptions && (
          <div className="absolute -left-32 -top-[60px] mt-3 z-10">
            <div className="min-w-[120px] flex flex-col bg-gray-50 dark:bg-custom-gray2 text-xs border border-gray-300 dark:border-gray-700 shadow whitespace-nowrap">
              <Link href={`/edit-post/${postId}`}>
                <button className="p-3 hover:bg-gray-200 dark:hover:bg-custom-gray3 w-full border-b border-gray-300 dark:border-gray-700 text-start">
                  Edit
                </button>
              </Link>
              <button
                className="p-3 hover:bg-gray-200 dark:hover:bg-custom-gray3 w-full text-start"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 h-screen w-full overflow-y-hidden">
          <div className="h-screen flex justify-center items-center">
            <div className="max-w-[400px] bg-gray-100 dark:bg-custom-gray2 p-5">
              <div className="pb-4 border-b border-gray-300 dark:border-gray-600">
                <p className="text-center text-lg">
                  {`Are you sure you want to delete post "${title}"?`}
                </p>
              </div>

              {!disableDelete ? (
                <div className="mt-5 flex justify-center gap-7 items-center text-sm text-white">
                  <button
                    className="bg-blue-600 font-semibold px-4 py-2 rounded"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-600 font-semibold px-4 py-2 rounded disabled:bg-opacity-50"
                    onClick={handleDelete}
                    disabled={disableDelete}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div className="mt-5 flex justify-center items-center text-sm">
                  <button className="bg-red-600/50  text-white font-semibold px-4 py-2 rounded cursor-not-allowed">
                    Deleting . . .
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OptionButton;
