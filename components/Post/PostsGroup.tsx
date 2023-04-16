import { getTimeDistance } from "@/utils/getTimeDistance";
import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type Props = Post & {
  user: {
    username: string;
  };
};

function PostsGroup({ heading, posts }: { heading: string; posts: Props[] }) {
  return (
    <div className="bg-gray-100 dark:bg-custom-gray2 shadow-md">
      <p className="p-3 border-b border-slate-300 dark:border-slate-700 text-lg text-center text-gray-900 dark:text-gray-50 font-montserrat font-semibold break-words">
        {heading}
      </p>

      <div className="py-2">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <div key={i} className="flex items-center px-4 py-3 gap-3 group">
              <Link href={`/post/${post.id}`}>
                <div className="w-[100px] h-[60px] relative">
                  <Image
                    src={post.imageUrl}
                    alt="programming"
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              <div className="self-start flex-1 flex flex-col">
                <h4 className="font-semibold line-clamp-2 title-color">
                  <Link key={i} href={`/post/${post.id}`}>
                    {post.title}
                  </Link>
                </h4>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By
                  <Link
                    href={`/user/${post.user.username}`}
                    className="ml-1 link"
                  >
                    {post.user.username}
                  </Link>
                </p>
                <p className="">
                  {/* Created At: {getTimeDistance(post.createdAt)} */}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-2">No posts available</p>
        )}
      </div>
    </div>
  );
}

export default PostsGroup;
