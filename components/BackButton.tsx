"use client";

import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  return (
    <button
      className="text-sm text-gray-500 dark:text-gray-400  hover:text-blue-800 dark:hover:text-blue-500"
      onClick={() => router.back()}
    >
      Go Back
    </button>
  );
}

export default BackButton;
