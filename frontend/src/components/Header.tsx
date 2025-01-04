import { UserButton } from "@clerk/clerk-react";

export default function Header() {
  return (
    <header className="relative flex h-32 w-full justify-between border-b-2 px-10 py-2">
      <div className="">
        <UserButton />
      </div>
    </header>
  );
}
