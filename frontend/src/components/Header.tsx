import { UserButton } from "@clerk/clerk-react";
import ThemeButton from "./ThemeButton";

export default function Header() {
  return (
    <header className="relative flex h-32 w-full justify-between border-b-2 px-10 py-2">
      <div className="relative left-2">
        <ThemeButton />
      </div>
      <div className="">
        <UserButton />
      </div>
    </header>
  );
}
