// import { categories } from "@/data/categories";
import { getCategories } from "@/prisma/find/getCategories";
import Link from "next/link";

async function Categories() {
  const { categories } = await getCategories();

  return (
    <div className="bg-gray-100 dark:bg-custom-gray2 shadow-md">
      <p className="p-3 border-b border-slate-300 dark:border-slate-700 text-lg text-center text-gray-900 dark:text-gray-50 font-montserrat font-semibold">
        Categories
      </p>
      <div className="py-2">
        {categories.map((category, i) => (
          <div
            key={i}
            className="py-1.5 px-6 flex justify-between items-center"
          >
            <p className="text-gray-900 dark:text-gray-50 capitalize link">
              <Link href={`/category/${category.name}`}>{category.name}</Link>
            </p>
            <span className="px-2.5 py-1 bg-zinc-300 dark:bg-zinc-500 rounded-xl text-xs">
              {category._count.posts}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
