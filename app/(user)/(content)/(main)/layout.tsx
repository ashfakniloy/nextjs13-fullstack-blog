import Navbar from "@/components/Layout/Navbar";
import Categories from "@/components/Post/Categories";
import PopularPosts from "@/components/Post/PopularPosts";
import Search from "@/components/Search";
// import RelatedPosts from "@/components/Post/RelatedPosts";

function UserMainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      {/* <Navbar /> */}
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1">{children}</div>

        <div className="w-[380px] space-y-5">
          {/* <Search /> */}
          {/* @ts-expect-error Server Component */}
          <PopularPosts />

          {/* <RelatedPosts /> */}

          {/* @ts-expect-error Server Component */}
          <Categories />
        </div>
      </div>
    </div>
  );
}

export default UserMainLayout;
