import PostsView from "@/components/Post/PostsView";
import { getPosts } from "@/prisma/find/getPosts";

async function HomePage({ searchParams: { page, limit } }: SearchParams) {
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const { posts, count } = await getPosts(pageNumber, limitNumber);

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <PostsView
        pageTitle="Recent Posts"
        posts={posts}
        postCount={count}
        limit={limitNumber}
      />
    </>
  );
}

export default HomePage;
