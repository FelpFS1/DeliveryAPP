import Loading from "@/components/Loading";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectPage() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;

    //const role = user?.publicMetadata?.role;

    //TODO::Aqui é a logica do usuario sem permissao voltar para a pagina de login
    navigate("/");

    //TODO::
    // if (role === "admin") {
    //   navigate("/admin");
    // } else if (role === "user") {
    //   navigate("/");
    // } else {
    //   navigate("/");
    // }
  }, [isLoaded, navigate, user?.publicMetadata?.role]);
  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <Loading />
    </div>
  );
}
