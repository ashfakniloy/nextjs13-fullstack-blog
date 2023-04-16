import { getRelatedPosts } from "@/prisma/find/getPosts";
import PostsGroup from "./PostsGroup";
import { posts } from "@/data/posts";

async function RelatedPosts({
  category,
  currentPostId,
}: {
  category: string;
  currentPostId: string;
}) {
  const { posts } = await getRelatedPosts(category, 5);

  const filteredPosts = posts.filter((post) => post.id !== currentPostId);

  return <PostsGroup heading="Related Posts" posts={filteredPosts} />;
}

export default RelatedPosts;
