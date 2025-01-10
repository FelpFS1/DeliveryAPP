import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div
      className={`absolute z-10 flex h-[100vh] w-full flex-col items-center justify-center`}
    >
      <LoaderCircle className="h-10 w-10 animate-spin text-center font-bold text-primary" />
      <p>Carregando...</p>
    </div>
  );
}
