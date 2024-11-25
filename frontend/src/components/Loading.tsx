import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Loading() {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <div
      className={`absolute z-10 flex h-[100vh] w-full flex-col items-center justify-center ${theme === "dark" ? "bg-customBlue text-white" : "bg-white"}`}
    >
      <span
        className={`h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 ${theme === "dark" ? "border-white" : "border-black"}`}
      ></span>
      <p>Carregando...</p>
    </div>
  );
}
