import PostsView from "@/components/Post/PostsView";
import { posts } from "@/data/posts";
import { getPosts, getPostsByCategory } from "@/prisma/find/getPosts";
import React from "react";

type Props = SearchParams & {
  params: {
    categoryName: string;
  };
};

export const dynamic = "force-dynamic";

async function CategoryPage({
  params: { categoryName },
  searchParams: { page, limit },
}: Props) {
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const { posts, count } = await getPostsByCategory(
    categoryName,
    pageNumber,
    limitNumber
  );

  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <PostsView
        pageTitle={`Recent Posts from ${categoryName}`}
        posts={posts}
        postCount={count}
        limit={limitNumber}
        route={`category/${categoryName}`}
      />
    </div>
  );
}

export default CategoryPage;
