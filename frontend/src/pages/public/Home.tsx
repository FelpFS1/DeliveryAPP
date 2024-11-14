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
      Home Page!
      <UserButton />
    </div>
  );
}
