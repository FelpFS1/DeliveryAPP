import { UserButton } from "@clerk/clerk-react";
import { MapPin } from "lucide-react";

interface HeaderProps {
  isAdmin?: boolean;
}
export default function Header({ isAdmin }: HeaderProps) {
  return (
    <header className="relative flex h-32 w-full items-center justify-between border-b-2 px-10 py-2">
      <div className="ml-4">
        <UserButton />
      </div>
      {!isAdmin && <MapPin className="mr-4 font-bold text-primary" />}
    </header>
  );
}
