"use client";

import { useTheme } from "@teispace/next-themes";

export function ThemeToggle() {
  const {  setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <button className="border border-app-primary/30 text-app-primary text-sm px-3 py-1.5 rounded-md" onClick={toggleTheme}>
      tema: {resolvedTheme}
    </button>
  );
}
