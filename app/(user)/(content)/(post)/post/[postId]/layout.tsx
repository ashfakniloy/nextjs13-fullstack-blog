import Categories from "@/components/Post/Categories";
import PopularPosts from "@/components/Post/PopularPosts";
import Search from "@/components/Search";
import RelatedPosts from "@/components/Post/RelatedPosts";
import UsersMorePosts from "@/components/Post/UsersMorePosts";
import { getSinglePost } from "@/prisma/find/getSinglePost";
import { notFound } from "next/navigation";

type Params = {
  postId: string;
};

export const dynamic = "force-dynamic";

async function SinglePostLayout({
  params: { postId },
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const { post } = await getSinglePost(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="">
      <div className="flex justify-between items-start gap-5 relative">
        <div className="flex-1">{children}</div>

        <div className="w-[380px] space-y-5">
          {/* <Search /> */}
          {/* @ts-expect-error Server Component */}
          <RelatedPosts category={post.categoryName} currentPostId={post.id} />

          {/* <div className="w-[380px] sticky top-20 "> */}
          {/* @ts-expect-error Server Component */}
          <UsersMorePosts
            username={post.user.username}
            currentPostId={post.id}
          />
          {/* </div> */}
          {/* @ts-expect-error Server Component */}
          <Categories />
        </div>
      </div>
    </div>
  );
}

export default SinglePostLayout;
