import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-app-bg font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 ">
        <div className="flex flex-col">
          <ThemeToggle />
        </div>
      
        <div className="bg-app-card border border-app-border px-2 py-2 w-[12rem] h-[12rem]">
          Card test
        </div>
      </main>
    </div>
  );
}
