"use client";

import { useEffect, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Loader } from "@/components/Loaders/Loader";
import useDebounce from "@/hooks/useDebounce";
import Link from "next/link";
import PostsGroup from "@/components/Post/PostsGroup";
import { Post } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import SearchResult from "./SearchResult";

type Props = Post & {
  user: {
    username: string;
  };
};

function Button() {
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [title, setTitle] = useState("");

  const debouncedValue = useDebounce(title, 500);

  const [searchResult, setSearchResult] = useState<null | Props[]>(null);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setShowSearchbar(false);
  }, [pathname]);

  useEffect(() => {
    title ? setLoading(true) : setLoading(false);
    setSearchResult(null);
  }, [title]);

  useEffect(() => {
    const getSearch = async () => {
      setSearchResult(null);

      const res = await fetch(`/api/post/search?title=${debouncedValue}`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (res.ok) {
        setSearchResult(data);
        setLoading(false);
        // console.log("data", data);
      } else {
        console.log(data);
        setLoading(false);
      }
    };

    debouncedValue && getSearch();

    // setLoading(false);
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    // <button
    //   type="button"
    //   className="relative flex"
    //   onClick={() => setShowSearchbar(!showSearchbar)}
    // >
    //   <div className="absolute right-2 top-1 items-end h-6 w-6">
    //     <MagnifyingGlassIcon />
    //   </div>
    //   <input
    //     type="text"
    //     placeholder={showSearchbar ? "Seach post title" : ""}
    //     className={`h-[35px] px-3 rounded-full  border border-gray-300 dark:border-custom-gray3 focus:border-cyan-500 dark:focus:border-cyan-700  text-gray-900 dark:text-gray-50 bg-gray-200 dark:bg-custom-gray2 p-2 outline-none transition-[width] duration-300 ease-out ${
    //       showSearchbar ? "w-[300px]" : "w-[35px] cursor-pointer"
    //     }`}
    //   />
    // </button>

    //perfect
    <div className="relative">
      <div
        className={`relative overflow-hidden h-[42px] flex items-center rounded-full bg-gray-100 dark:bg-custom-gray2 shadow-md   transition-[width] duration-300 ease-out  ${
          showSearchbar ? "w-[380px]" : "w-[42px]"
        }`}
      >
        <button
          type="button"
          className={`absolute p-1 right-1.5 h-7 w-7 bg-gray-200 dark:bg-custom-gray3 rounded-full transition-transform duration-300 ${
            showSearchbar && "-rotate-90"
          }`}
          onClick={() => {
            setShowSearchbar(!showSearchbar);
            setTitle("");
          }}
        >
          {!showSearchbar ? <MagnifyingGlassIcon /> : <XMarkIcon />}
        </button>

        {showSearchbar && (
          <div className="flex flex-1 items-center">
            <label className="flex max-w-[34px]">
              {!loading ? (
                <label
                  htmlFor="search"
                  aria-label="search"
                  className="ml-3 mt-1 h-6 w-6 text-gray-400"
                >
                  <MagnifyingGlassIcon />
                </label>
              ) : (
                <span className="ml-3">
                  <Loader width="23" />
                </span>
              )}
            </label>

            <input
              autoFocus={showSearchbar && true}
              type="text"
              placeholder="Seach post title"
              name="search"
              autoComplete="off"
              value={title}
              onChange={handleChange}
              className={`px-3 rounded-full bg-gray-100 dark:bg-custom-gray2  text-gray-900 dark:text-gray-50  outline-none w-full `}
            />
          </div>
        )}
      </div>
      {showSearchbar && searchResult && (
        // <div className="absolute shadow-md top-[59px] w-full border border-slate-300 dark:border-slate-700  overflow-hidden">
        //   <PostsGroup
        //     heading={`Search results for "${debouncedValue}"`}
        //     posts={searchResult}
        //   />
        // </div>
        <SearchResult
          heading={`Search results for "${debouncedValue}"`}
          posts={searchResult}
        />

        // <div className="bg-custom-gray2 absolute top-[60px] w-full p-3">
        //   <p className="text-lg">Search results for "{debouncedValue}"</p>
        //   {searchResult.length > 0 ? (
        //     <div className="max-h-[265px] overflow-y-auto scrollbar-thin scrollbar-track-gray-600/50 scrollbar-thumb-gray-500/50">
        //       {searchResult.map((result, i) => (
        //         <Link key={i} href={`/post/${result.id}`}>
        //           <p key={i} className="p-3 hover:bg-gray-700">
        //             {result.title}
        //           </p>
        //         </Link>
        //       ))}
        //     </div>
        //   ) : (
        //     <p className="p-3 text-center">No results found</p>
        //   )}
        // </div>
      )}
    </div>

    // <div
    //   className={`relative  h-[42px] flex items-center rounded-full bg-gray-400 dark:bg-custom-gray2 shadow-md   transition-[width] duration-300 ease-out  ${
    //     showSearchbar ? "w-[380px]" : "w-[42px]"
    //   }`}
    // >
    //   <button
    //     type="button"
    //     className="absolute right-0 bg-gray-600 dark:bg-custom-gray3 inset-y-0 flex justify-center items-center rounded-full overflow-hidden p-1.5 m-1"
    //     onClick={() => setShowSearchbar(!showSearchbar)}
    //   >
    //     <span
    //       className={`h-6 w-6 rounded-full transition-transform duration-300 ${
    //         showSearchbar && "-rotate-90"
    //       }`}
    //     >
    //       {!showSearchbar ? <MagnifyingGlassIcon /> : <XMarkIcon />}
    //     </span>
    //   </button>

    //   {showSearchbar && (
    //     <div className="flex items-center">
    //       {/* <label
    //   htmlFor="search"
    //   aria-label="search"
    //   className="ml-3 mt-1 h-6 w-6 text-gray-400"
    // >
    //   <MagnifyingGlassIcon />
    // </label> */}
    //       <span className="ml-3">
    //         <Loader width="25" />
    //       </span>
    //       <input
    //         autoFocus={showSearchbar && true}
    //         type="text"
    //         placeholder="Seach post title"
    //         className={`px-3 rounded-full bg-gray-100 dark:bg-custom-gray2  text-gray-900 dark:text-gray-50  outline-none w-full `}
    //       />
    //     </div>
    //   )}
    // </div>
  );
}

export default Button;
