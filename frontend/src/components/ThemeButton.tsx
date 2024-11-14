import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { switchTheme } from "@/redux/theme/slice";

export default function ThemeButton(props: { position: string }) {
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<AppDispatch>();

  const handleSwitchTheme = () => {
    dispatch(switchTheme());
  };

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);
  return (
    <Button
      onClick={handleSwitchTheme}
      variant="outline"
      className={`absolute ${props.position}`}
    >
      {theme === "dark" ? (
        <Sun className="text-white" />
      ) : (
        <Moon className="" />
      )}
    </Button>
  );
}
