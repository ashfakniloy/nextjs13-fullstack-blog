"use client";

import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function ViewToggle({ cookieView }: { cookieView: string | undefined }) {
  const router = useRouter();

  const handleView = (view: string) => {
    Cookies.set("view", view);
    router.refresh();
  };

  return (
    <div className="flex gap-3 text-gray-600 dark:text-gray-300">
      <button
        className={`h-7 w-7 p-0.5 hover:bg-gray-300 dark:hover:bg-gray-700 rounded ${
          (!cookieView || cookieView === "list") &&
          "bg-gray-300 dark:bg-gray-700"
        }`}
        onClick={() => handleView("list")}
      >
        <ListBulletIcon />
      </button>
      <button
        className={`h-7 w-7 p-0.5 hover:bg-gray-300 dark:hover:bg-gray-700 rounded ${
          cookieView === "grid" && "bg-gray-300 dark:bg-gray-700"
        }`}
        onClick={() => handleView("grid")}
      >
        <Squares2X2Icon />
      </button>
    </div>
  );
}

export default ViewToggle;
