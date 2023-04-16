"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import useDebounce from "@/hooks/useDebounce";

function Search() {
  const [title, setTitle] = useState("");

  const debouncedValue = useDebounce(title, 500);

  const [searchResult, setSearchResult] = useState<
    null | { id: String; title: string }[]
  >(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    title ? setLoading(true) : setLoading(false);
    setSearchResult(null);
  }, [title]);

  useEffect(() => {
    const getSearch = async () => {
      setSearchResult(null);
      // const res = await fetch(`/api/search-old/${debouncedValue}`, {
      const res = await fetch(`/api/search?title=${debouncedValue}`, {
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
    <div className="shadow-md relative">
      <div className="flex">
        {/* <div className="flex">
        <div className="relative"> */}
        <div className="w-full relative">
          <input
            type="text"
            className={`w-full text-gray-900 dark:text-gray-50 font-montserrat font-semibold bg-gray-100 dark:bg-custom-gray2 p-3 outline-none ${
              searchResult
                ? "rounded-b-none border-gray-700"
                : "border-transparent"
            }`}
            placeholder="Search Post"
            name="search"
            autoComplete="off"
            value={title}
            onChange={handleChange}
          />
          {title && (
            <button
              className="absolute inset-y-0 flex items-center right-0 p-1 pr-2 bg-gray-100 dark:bg-custom-gray2 text-gray-600 dark:text-gray-400 hover:text-opacity-70 dark:hover:text-opacity-70"
              onClick={() => setTitle("")}
            >
              <XMarkIcon className="h-7 w-7" />
            </button>
          )}
        </div>
        {/* {loading && (
            <div className="absolute -bottom-6 w-full">
              <p className="text-center text-sm">Searching...</p>
            </div>
          )} */}
        {/* </div> */}
        <button className="bg-gray-50 dark:bg-custom-gray3 px-4">
          {/* Search */}
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
        {/* {searchResult && (
          <div className="bg-gray-800 absolute top-[41px] w-full rounded-b-md overflow-hidden text-sm">
            {searchResult.length > 0 ? (
              <div className="max-h-[265px] overflow-y-auto scrollbar-thin scrollbar-track-gray-600/50 scrollbar-thumb-gray-500/50">
                {searchResult.map((result, i) => (
                  <Link key={i} href={`/post/${result.id}`}>
                    <p key={i} className="p-3 hover:bg-gray-700">
                      {result.title}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="p-3 text-center">No results found</p>
            )}
          </div>
        )} */}
      </div>
      {/* <div className="mt-1.5 bg-gray-50 dark:bg-custom-gray3  absolute  w-full shadow-lg">
        <p className="p-3 hover:bg-gray-200 dark:hover:bg-[#2f2e2e]">
          Search Result Search Result Search Result
        </p>
        <p className="p-3 hover:bg-gray-200 dark:hover:bg-[#2f2e2e]">
          Search Result Search Result Search Result
        </p>
        <p className="p-3 hover:bg-gray-200 dark:hover:bg-[#2f2e2e]">
          Search Result Search Result Search Result
        </p>
        <p className="p-3 hover:bg-gray-200 dark:hover:bg-[#2f2e2e]">
          Search Result Search Result Search Result
        </p>
        <p className="p-3 hover:bg-gray-200 dark:hover:bg-[#2f2e2e]">
          Search Result Search Result Search Result
        </p>
        <p className="p-3 hover:bg-gray-200 dark:hover:bg-[#2f2e2e]">
          Search Result Search Result Search Result
        </p>
        <p className="border-t border-gray-300 dark:border-gray-600 p-4 text-center hover:bg-gray-200 dark:hover:bg-[#2f2e2e]">
          View all result
        </p>
      </div> */}
      {/* <div className="mt-1.5 absolute w-full  bg-gray-50 dark:bg-custom-gray3 shadow-lg">
        <p className="p-4 text-center">No Result Found</p>
      </div> */}
    </div>
  );
}

export default Search;
