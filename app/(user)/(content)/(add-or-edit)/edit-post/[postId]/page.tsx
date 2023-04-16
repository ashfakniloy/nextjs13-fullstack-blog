import { getSinglePost } from "@/prisma/find/getSinglePost";
import { notFound } from "next/navigation";
import EditPostForm from "./EditPostForm";
import { getCategories } from "@/prisma/find/getCategories";

type Props = {
  params: {
    postId: string;
  };
};

export const dynamic = "force-dynamic";

async function EditPostPage({ params: { postId } }: Props) {
  const { post } = await getSinglePost(postId);
  const { categories } = await getCategories();

  const allcategories = categories.map((category) => category.name);

  // const postCopy = { ...post };

  // delete postCopy.createdAt;
  // delete postCopy.updatedAt;
  // delete postCopy._count;

  // console.log("postcopy", postCopy);

  if (!post) {
    notFound();
  }

  const postCopy = {
    id: post.id,
    title: post.title,
    categoryName: post.categoryName,
    imageUrl: post.imageUrl,
    imageId: post.imageId,
    article: post.article,
  };

  // console.log("postCopy", postCopy);

  return <EditPostForm post={postCopy} categories={allcategories} />;
}

export default EditPostPage;
