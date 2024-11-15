import Loading from "@/components/Loading";
import ThemeButton from "@/components/ThemeButton";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { userId, isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!userId) {
      navigate("/login");
    }
  }, [isLoaded, isSignedIn, navigate, userId]);

  return (
    <>
      {isLoaded ? (
        <div>
          <ThemeButton position="top-2 left-2" />
          Home Page!
          <UserButton />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
