"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import parser from "html-react-parser";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function PostPreviewPage() {
  const router = useRouter();
  const [previewPost, setPreviewPost] = useState({
    title: "",
    category: "",
    imageUrl: "",
    imageId: "",
    article: "",
  });

  useEffect(() => {
    // const persistedPost = JSON.parse(localStorage.getItem("newPost") || "");

    const persistedPost = localStorage.getItem("draftPost");
    const parsedPost = persistedPost && JSON.parse(persistedPost || "");
    setPreviewPost(parsedPost);
  }, []);

  useEffect(() => {
    const persistedPost = localStorage.getItem("draftPost");
    const parsedPost = persistedPost && JSON.parse(persistedPost || "");
    console.log(parsedPost);

    const regex = /(<([^>]+)>)/gi;
    const hasArticle = !!parsedPost.article.replace(regex, "").length;

    if (!parsedPost || Object.values(parsedPost).includes("") || !hasArticle)
      router.replace("/add-post");
  }, [previewPost]);

  const handlePublish = async () => {
    // console.log("previewPost", previewPost);
    const toastPublish = toast.loading("Loading...");

    const url = "/api/post";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(previewPost),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Post created successfully", {
        id: toastPublish,
      });
      console.log("success", data);
      const postId = data.response.id;
      router.refresh();
      router.push(`/post/${postId}`);

      // setDraftPost("");
      localStorage.removeItem("draftPost");
    } else {
      toast.error(`${data.error}`, {
        id: toastPublish,
      });
      console.log("error", data);
    }
  };

  if (!previewPost) return;

  return (
    <div className="w-[778px] break-words">
      <div className="absolute inset-x-0 flex justify-center">
        <span className="bg-green-800 text-sm font-bold text-gray-300 px-3 py-1.5 rounded">
          Post Preview
        </span>
      </div>
      <div className="mb-4 text-gray-700 dark:text-gray-300 ">
        {/* <Link
          href={`/category/${previewPost.category}`}
          className="hover:text-blue-800 dark:hover:text-blue-500"
        > */}
        {/* {newPost.category} */}
        {previewPost.category}
        {/* </Link> */}
      </div>

      {/* <div className="p-5 bg-gray-100 dark:bg-custom-gray2 shadow-md"> */}

      <div className="">
        <h1 className="text-4xl text-gray-900 dark:text-gray-50 font-montserrat font-bold">
          {previewPost.title}
        </h1>
        <div className="mt-2 text-sm flex items-center gap-6 text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="bg-gray-500 p-4 rounded-full"></span>
            <p className="">
              By {/* <Link href={`/user/123`}> */}
              <span className="hover:text-blue-800 dark:hover:text-blue-500">
                Random User
              </span>
              {/* </Link> */}
            </p>
          </div>
          <p className="">Date: 01/01/2023</p>
        </div>

        {previewPost.imageUrl && (
          <div className="mt-5 h-[470px] relative">
            <Image
              src={previewPost.imageUrl}
              alt="image"
              fill
              className="object-cover"
            />
          </div>
        )}

        <p className="mt-6">{parser(previewPost.article || "")}</p>
      </div>

      <div className="mt-5 mb-5 flex justify-between">
        <Link href="/add-post">
          <button className="px-4 py-2 text-sm font-bold text-gray-300 bg-green-800 rounded">
            Edit
          </button>
        </Link>
        <button
          className="px-4 py-2 text-sm font-bold text-gray-300 bg-blue-800 rounded"
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>
    </div>
  );
}

export default PostPreviewPage;
