// import Categories from "@/components/Post/Categories";
// import PopularPosts from "@/components/Post/PopularPosts";
// import Search from "@/components/Search";
// import RelatedPosts from "@/components/Post/RelatedPosts";
// import UsersMorePosts from "@/components/Post/UsersMorePosts";

function AddPostLayout({
  children,
}: {
  params: any;
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="flex justify-between items-start gap-5 relative">
        <div className="flex-1">{children}</div>

        <div className="lg:w-[380px]"></div>
      </div>
    </div>
  );
}

export default AddPostLayout;
