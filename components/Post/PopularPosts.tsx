import { getPopularPosts } from "@/prisma/find/getPopularPosts";
import PostsGroup from "./PostsGroup";
// import { posts } from "@/data/posts";

// const popularPosts = posts.slice(0, 5);

async function PopularPosts() {
  const { popularPosts } = await getPopularPosts(5);

  return <PostsGroup heading="Popular Posts" posts={popularPosts} />;
}

export default PopularPosts;
