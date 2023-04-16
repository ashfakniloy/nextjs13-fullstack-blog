"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { navLinks } from "../navLinks";
import ThemeButton from "./ThemeButton";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import useToggle from "@/hooks/useToggle";
import Image from "next/image";
import user1 from "@/public/images/user1.jpg";
import SearchButton from "./SearchButton";

function Navbar({
  session,
  imageUrl,
  username,
}: {
  session: Session | null;
  imageUrl?: string | null;
  username?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  // const { status } = useSession();
  const { node, toggle, setToggle } = useToggle();

  // console.log("session from server", session);

  const handleSignOut = () => {
    signOut({
      // redirect: false,
      callbackUrl: `${window.location.origin}`,
    });

    // router.refresh();
    // router.push("/signin");
  };

  return (
    <div className="sticky top-0 z-20 py-4 flex justify-between items-center bg-gray-100/30 dark:bg-custom-gray/30 backdrop-blur-md  border-gray-300 dark:border-zinc-700">
      <div className="text-4xl text-red-500 dark:text-red-300 font-montserrat font-bold">
        <Link href="/">logo</Link>
      </div>

      {/* <div className="flex justify-between items-center gap-20"> */}
      <div className="flex items-center gap-10">
        <SearchButton />
        <ThemeButton />
        {session ? (
          <div className="flex items-center gap-10">
            {navLinks.map((navLink, i) => (
              <Link
                key={i}
                href={navLink.link}
                // onClick={() => router.refresh()}
              >
                <p
                  className={`text-sm font-montserrat font-bold text-gray-800 dark:text-gray-300 ${
                    pathname === navLink.link &&
                    "text-red-600 dark:text-red-400"
                  }`}
                >
                  {navLink.name}
                </p>
              </Link>
            ))}

            <div ref={node} className="relative">
              <button
                onClick={() => setToggle(!toggle)}
                className="active:scale-95 transition-transform duration-100 rounded-full overflow-hidden"
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="user image"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src="/images/blankUser.jpg"
                    alt="user image"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
              </button>

              {toggle && (
                <div className="absolute flex justify-end inset-x-0 mt-3">
                  <div className="min-w-[180px] bg-gray-100 dark:bg-custom-gray2 text-sm border border-gray-300 dark:border-gray-700  whitespace-nowrap">
                    <div className="p-4 border-b border-gray-300 dark:border-gray-700 space-y-1">
                      <p className="">Signed in as </p>
                      <p className="font-semibold">{username}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="px-4 py-3 hover:bg-gray-300 dark:hover:bg-custom-gray3 w-full text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* <button
              onClick={handleSignOut}
              className="bg-red-700 px-3 py-1.5 text-sm text-white font-bold rounded"
            >
              Sign Out
            </button> */}
          </div>
        ) : (
          <div className="flex items-center gap-7">
            <Link href="/signup">
              <button className="bg-blue-700 px-3 py-1.5 text-sm text-white font-bold rounded">
                Sign Up
              </button>
            </Link>
            <Link href="/signin">
              <button className="bg-green-700 px-3 py-1.5 text-sm text-white font-bold rounded">
                Sign In
              </button>
            </Link>
          </div>
        )}
        {/* {status === "authenticated" && 

            navLinks.map((navLink, i) => (
              <Link key={i} href={navLink.link}>
                <p
                  className={`text-sm font-montserrat font-bold text-gray-800 dark:text-gray-300 ${
                    pathname === navLink.link &&
                    "text-red-600 dark:text-red-400"
                  }`}
                >
                  {navLink.name}
                </p>
              </Link>
            ))} */}
      </div>
    </div>
    // </div>
  );
}

export default Navbar;
