import PostsGroup from "./PostsGroup";
import { getMorePostsByUsername } from "@/prisma/find/getMorePostsByUsername";
// import { posts } from "@/data/posts";

async function UsersMorePosts({
  username,
  currentPostId,
}: {
  username: string;
  currentPostId: string;
}) {
  const { posts } = await getMorePostsByUsername(username, 5);

  const filteredPosts = posts.filter((post) => post.id !== currentPostId);

  return (
    <PostsGroup heading={`More Posts from ${username}`} posts={filteredPosts} />
  );
}

export default UsersMorePosts;
