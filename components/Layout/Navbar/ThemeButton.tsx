"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button className="h-7 w-7 p-1 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-full">
      {currentTheme === "dark" ? (
        <SunIcon
          className="text-yellow-500"
          onClick={() => setTheme("light")}
        />
      ) : (
        <MoonIcon className="text-gray-700" onClick={() => setTheme("dark")} />
      )}
    </button>
  );
}

export default ThemeButton;
