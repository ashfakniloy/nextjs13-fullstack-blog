"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function ProfileLink({ page }: { page: { link: string; name: string } }) {
  const pathname = usePathname();

  return (
    <div className="w-full relative">
      <Link href={page.link}>
        <div
          className={`py-3 ${
            pathname === page.link
              ? "text-blue-600 dark:text-blue-500"
              : "hover:bg-gray-300/50 dark:hover:bg-custom-gray2"
          } `}
        >
          <p>{page.name}</p>
          {pathname === page.link && (
            <div className="absolute rounded -bottom-[1px] inset-x-0 border-t-2 border-blue-500 "></div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default ProfileLink;
