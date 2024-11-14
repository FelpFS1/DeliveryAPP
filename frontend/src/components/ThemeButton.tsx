import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
type SwitchTheme = "light" | "dark";

export default function ThemeButton() {
  const [theme, setTheme] = useState<SwitchTheme>("light");

  const handleSwitchTheme = () => {
    setTheme((currentTheme) => {
      if (currentTheme === "dark") {
        return "light";
      }
      return "dark";
    });
  };
  return (
    <Button
      onClick={handleSwitchTheme}
      variant="outline"
      className="absolute left-1 top-1"
    >
      {theme === "dark" ? (
        <Sun className="text-white" />
      ) : (
        <Moon className="" />
      )}
    </Button>
  );
}
