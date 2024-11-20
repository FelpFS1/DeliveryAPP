import CardProduct from "@/components/CardProduct";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { ArrowRight, Dot, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import Header from "@/components/Header";

export default function HomePage() {
  const { userId, isSignedIn } = useAuth();
  const { theme } = useSelector((state: RootState) => state.theme);
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const role = user?.publicMetadata?.role;

    if (role === "admin") {
      navigate("/admin");
    } else if (role === "user") {
      setIsShow(true);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isLoaded, isSignedIn, navigate, user?.publicMetadata?.role, userId]);

  return (
    <>
      {isLoaded && isShow ? (
        <div>
          <Header />
          <main className="h-full w-full px-10">
            <header className="relative bottom-10 h-36 w-full rounded-2xl border-2 bg-white shadow-md">
              <div className="relative bottom-10 m-auto h-20 w-20 rounded-full bg-zinc-100">
                <img
                  className="h-20 w-20 rounded-full object-cover"
                  src="https://blog.simpliza.com.br/wp-content/uploads/2024/06/logo-de-acai-como-criar.png"
                  alt=""
                />
              </div>
              <p className="mb-4 border-b-2 border-gray-200 px-2 font-bold text-black">
                Delivery
              </p>
              <footer
                className={`flex h-10 w-full items-center justify-center rounded-b-2xl ${theme == "dark" ? "bg-zinc-800" : "bg-primary"}`}
              >
                <p className="flex items-center justify-center text-sm font-bold">
                  <Dot className="h-10 w-10 animate-pulse text-red-800" /> Loja
                  fechada - Abre amanhã às 14:00
                </p>
              </footer>
            </header>
            <section className="mb-5 grid h-full w-full">
              <h2 className="mb-2 flex items-center text-xl font-bold">
                <ArrowRight /> Açai
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <CardProduct />
                <CardProduct />
              </div>
            </section>
            <section className="mb-5 grid h-full w-full">
              <h2 className="mb-2 flex items-center text-xl font-bold">
                <ArrowRight /> Petisqueira
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <CardProduct />
              </div>
            </section>
            <div className="fixed bottom-5 right-10">
              <Button className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-white">
                <span className="absolute bottom-9 right-1 h-5 w-5 rounded-full bg-white text-center text-black">
                  1
                </span>
                <ShoppingCart />
              </Button>
            </div>
          </main>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
