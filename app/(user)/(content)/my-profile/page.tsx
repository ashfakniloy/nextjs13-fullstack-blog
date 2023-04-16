import PostsView from "@/components/Post/PostsView";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getPosts, getPostsByUserId } from "@/prisma/find/getPosts";
import { getServerSession } from "next-auth";
// import { posts } from "@/data/posts";

async function MyProfilePage({ searchParams: { page, limit } }: SearchParams) {
  const session = await getServerSession(authOptions);

  if (!session) return;

  const userId = session?.user.id;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const { posts, count } = await getPostsByUserId(
    userId,
    pageNumber,
    limitNumber
  );

  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <PostsView
        pageTitle="Recent Posts From Random User"
        posts={posts}
        postCount={count}
        limit={limitNumber}
        route="my-profile"
      />
    </div>
  );
}

export default MyProfilePage;
