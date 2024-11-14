import ThemeButton from "@/components/ThemeButton";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  });

  return (
    <div>
      <ThemeButton position="top-2 left-2" />
      Home Page!
      <UserButton />
    </div>
  );
}
