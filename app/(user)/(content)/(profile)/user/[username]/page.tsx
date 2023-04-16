import PostsView from "@/components/Post/PostsView";

import { getPostsByUsername } from "@/prisma/find/getPosts";

type Props = SearchParams & {
  params: {
    username: string;
  };
};

async function UserPage({
  params: { username },
  searchParams: { page, limit },
}: Props) {
  const actualUsername = username.split("%20").join(" ");
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const { posts, count } = await getPostsByUsername(
    actualUsername,
    pageNumber,
    limitNumber
  );

  // console.log("params", username);

  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <PostsView
        pageTitle={`Recent Posts From ${username}`}
        posts={posts}
        postCount={count}
        limit={limitNumber}
        route={`user/${username}`}
      />
    </div>
  );
}

export default UserPage;
