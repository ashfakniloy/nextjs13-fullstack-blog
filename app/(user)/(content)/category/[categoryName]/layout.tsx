import programming from "@/public/images/programming.jpg";
import robotics from "@/public/images/robotics.jpg";
import astronaut from "@/public/images/astronaut.jpg";
import space from "@/public/images/space.jpg";
import architect from "@/public/images/architect.jpg";
import Image from "next/image";
import Link from "next/link";
import RelatedPosts from "@/components/Post/RelatedPosts";
import Search from "@/components/Search";
import Categories from "@/components/Post/Categories";
import PopularPosts from "@/components/Post/PopularPosts";

type Params = {
  categoryName: string;
};
function CategoryLayout({
  params: { categoryName },
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {/* <div className="mb-10">
    <BackButton />
  </div> */}
      <div className="relative bg-black">
        <div className="-mt-5 w-full h-[400px] relative">
          <Image
            src={space}
            alt="category"
            fill
            className="object-cover opacity-75"
          />
        </div>
        <div className="absolute flex flex-col justify-center items-center text-white inset-0 text-5xl  font-montserrat tracking-wider font-bold capitalize select-none">
          {categoryName}
        </div>
      </div>

      <div className="mt-20 flex justify-between items-start gap-5 relative">
        <div className="flex-1">{children}</div>

        <div className="w-[380px] space-y-5">
          {/* <Search /> */}
          {/* @ts-expect-error Server Component */}
          <PopularPosts />
          {/* @ts-expect-error Server Component */}
          <Categories />
        </div>
      </div>
    </div>
  );
}

export default CategoryLayout;
