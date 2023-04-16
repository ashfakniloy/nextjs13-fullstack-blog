import Link from "next/link";
import Image from "next/image";
import parser from "html-react-parser";
import type { Session } from "next-auth";
import OptionButton from "./OptionButton";
import PostLike from "./PostLike";
import { getTimeDistance } from "@/utils/getTimeDistance";
import { Post } from "@prisma/client";
import { getPluralize } from "@/utils/getPluralize";
import { EyeIcon } from "@heroicons/react/24/solid";

type SessionProps = {
  session: Session | null;
};

type Props = Omit<Post, "userId" | "views" | "updatedAt"> & {
  user: {
    id: string;
    username: string;
  };
  _count: {
    comments: number;
    views: number;
  };
};

function List({
  id,
  title,
  categoryName,
  user,
  createdAt,
  imageUrl,
  imageId,
  article,
  session,
  _count,
}: Props & SessionProps) {
  return (
    <div className="bg-gray-100 dark:bg-custom-gray2 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex gap-4 min-h-[150px] p-4">
        <div className="w-[200px] relative">
          <Link href={`/post/${id}`}>
            <Image
              src={imageUrl}
              alt="programming"
              fill
              className="object-cover"
            />
            <span className="absolute bottom-0 left-0 bg-black/70 text-white text-xs  px-3 py-1.5 capitalize">
              {categoryName}
            </span>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <Link href={`/post/${id}`}>
              <h4 className="text-xl font-semibold line-clamp-1 title-color">
                {title}
              </h4>
            </Link>

            <div className="mt-1 flex items-center gap-5 text-sm text-gray-500 dark:text-gray-400">
              <p className="">
                By
                <Link href={`/user/${user.username}`} className="ml-1.5 link">
                  {user.username}
                </Link>
              </p>
              <p className=""> {getTimeDistance(createdAt)}</p>
            </div>
            <div className="mt-3 text-gray-700 dark:text-gray-300 line-clamp-2 text-sm">
              {/* {article} */}
              {parser(article || "")}
            </div>
          </div>
          <div className="mt-1 flex justify-between items-center">
            <div className="flex items-center text-sm">
              {/* @ts-expect-error Server Component */}
              <PostLike postId={id} />
              {/* {(likes?.length > 0 || session) && (
                <PostLikeButton
                  postId={id}
                  likes={likes}
                  session={session}
                  hasLiked={hasLiked}
                />
              )} */}
              {_count.comments > 0 && (
                <Link
                  href={`/post/${id}`}
                  className="mr-4 text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-500"
                >
                  {getPluralize(_count.comments, "Comment", "s")}
                </Link>
              )}
              {_count.views > 0 && (
                <div className="">
                  <div className="flex items-center gap-1 text-sm">
                    <EyeIcon className="h-6 w-6 text-gray-400 dark:text-gray-600" />
                    <p className="text-gray-700 dark:text-gray-300">
                      {getPluralize(_count.views, "View", "s")}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {session?.user.id === user.id && (
              <OptionButton title={title} postId={id} imageId={imageId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
