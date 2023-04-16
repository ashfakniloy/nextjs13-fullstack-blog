import PostsGroup from "./PostsGroup";
import { getUsersPopularPosts } from "@/prisma/find/getPopularPosts";
// import { posts } from "@/data/posts";

async function UsersPopularPosts({ username }: { username: string }) {
  const { usersPopularPosts } = await getUsersPopularPosts(5, username);

  return (
    <PostsGroup
      heading={`Popular Posts from ${username}`}
      posts={usersPopularPosts}
    />
  );
}

export default UsersPopularPosts;
