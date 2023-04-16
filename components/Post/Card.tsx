import Image from "next/image";
import Link from "next/link";
import parser from "html-react-parser";
import type { Session } from "next-auth";
import OptionButton from "./OptionButton";
import PostLike from "./PostLike";
import { Post } from "@prisma/client";
import { getTimeDistance } from "@/utils/getTimeDistance";
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

function Card({
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
    <div className="group bg-gray-100 dark:bg-custom-gray2 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="w-[378px] ">
        <div className="h-[200px] relative overflow-hidden">
          <Link href={`/post/${id}`}>
            <Image
              src={imageUrl}
              alt="programming"
              fill
              className="object-cover group-hover:scale-105 transition duration-700 ease-out"
            />
          </Link>
          <div className="absolute bottom-0 right-0">
            <span className="bg-black/70 text-white text-xs px-3 py-1.5 capitalize">
              {categoryName}
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col justify-between min-h-[192px]">
          <div>
            <Link href={`/post/${id}`}>
              <h4 className="text-xl font-semibold line-clamp-2 title-color">
                {title}
              </h4>
            </Link>
            <div className="mt-1 flex items-center gap-5 text-sm text-gray-500 dark:text-gray-400">
              <p className="">
                By{" "}
                <Link
                  href={`/user/${user.username}`}
                  className="hover:text-blue-800 dark:hover:text-blue-500"
                >
                  {user.username}
                </Link>{" "}
              </p>
              <p className="">{getTimeDistance(createdAt)}</p>
            </div>
            <div className="mt-2 text-gray-700 dark:text-gray-300 line-clamp-2 text-sm">
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

export default Card;
