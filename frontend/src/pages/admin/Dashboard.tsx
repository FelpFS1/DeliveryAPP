import Header from "@/components/Header";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoaded) return;

    const role = user?.publicMetadata?.role;

    if (role === "admin") {
      navigate("/admin");
    } else if (role === "user") {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isLoaded, navigate, user?.publicMetadata?.role]);
  return (
    <div>
      <Header />
    </div>
  );
}
