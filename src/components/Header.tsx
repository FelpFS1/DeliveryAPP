import { UserButton } from "@clerk/clerk-react";
import { MapPin } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import AdressModal from "./AdressModal";

interface HeaderProps {
  isAdmin?: boolean;
}
export default function Header({ isAdmin }: HeaderProps) {
  return (
    <header className="relative mt-12 flex h-32 w-full items-center justify-between border-b-2 px-10 py-2">
      <div className="ml-4">
        <UserButton />
      </div>
      {!isAdmin && (
        <Dialog>
          <DialogTrigger asChild>
            <MapPin className="mr-4 h-7 w-7 cursor-pointer font-bold text-primary" />
          </DialogTrigger>
          <AdressModal />
        </Dialog>
      )}
    </header>
  );
}
