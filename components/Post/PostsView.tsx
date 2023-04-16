import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import List from "./List";
import Card from "./Card";
import ViewToggle from "./ViewToggle";
import { Post } from "@prisma/client";
import Pagination from "./Pagination";
import { PER_PAGE } from "@/config";

type Props = Post & {
  user: {
    id: string;
    username: string;
  };
  _count: {
    comments: number;
    views: number;
  };
};

async function PostsView({
  pageTitle,
  posts,
  postCount,
  limit,
  route,
}: {
  pageTitle: string;
  posts: Props[];
  postCount: number;
  limit: number;
  route?: string;
}) {
  const session = await getServerSession(authOptions);

  const cookieStore = cookies();
  const view = cookieStore.get("view")?.value;

  // console.log("posts", posts);

  return (
    <div>
      <div className="ml-1 mb-5 h-[50px] flex justify-between items-center">
        <h4 className=" text-3xl font-extrabold font-montserrat text-gray-700 dark:text-gray-400 ">
          {pageTitle}
        </h4>

        <ViewToggle cookieView={view} />
      </div>

      {posts.length ? (
        <div className="">
          {(!view || view === "list") && (
            <div className="space-y-5">
              {posts.map((post, i) => (
                <List
                  key={i}
                  id={post.id}
                  title={post.title}
                  categoryName={post.categoryName}
                  imageUrl={post.imageUrl}
                  imageId={post.imageId}
                  user={post.user}
                  article={post.article}
                  createdAt={post.createdAt}
                  session={session}
                  _count={post._count}
                  // userId={post.userId}
                  // updatedAt={post.updatedAt}
                  // views={post.views}
                />
              ))}
            </div>
          )}

          {view === "grid" && (
            <div className="grid grid-cols-2 gap-5">
              {posts.map((post, i) => (
                <Card
                  key={i}
                  id={post.id}
                  title={post.title}
                  categoryName={post.categoryName}
                  imageUrl={post.imageUrl}
                  imageId={post.imageId}
                  user={post.user}
                  article={post.article}
                  createdAt={post.createdAt}
                  session={session}
                  _count={post._count}
                />
              ))}
            </div>
          )}

          {postCount > (limit || PER_PAGE) && (
            <div className="mt-8">
              <Pagination
                postCount={postCount}
                limit={limit || PER_PAGE}
                route={route}
              />
            </div>
          )}
        </div>
      ) : (
        <p className="text-xl text-red-500">No post found</p>
      )}
    </div>
  );
}

export default PostsView;
