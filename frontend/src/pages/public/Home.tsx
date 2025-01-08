import CardProduct from "@/components/CardProduct";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dot, ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Header from "@/components/Header";

import { db, dbTypes } from "@/db/fakedb";
import Cart from "@/components/Cart";
import { RootState } from "@/features/redux/store";
import { useSelector } from "react-redux";

interface SepareteProducts {
  type: string;
  content: dbTypes[];
}

export default function HomePage() {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { cart, isAnimatingCart } = useSelector(
    (state: RootState) => state.cart,
  );

  const separeteProductsType = useMemo(() => {
    return db.reduce((prev, curr) => {
      const isExistType = prev.find((item) => item.type === curr.productType);

      if (isExistType) {
        isExistType.content.push(curr);
      } else {
        prev.push({ type: curr.productType, content: [curr] });
      }
      return prev;
    }, [] as SepareteProducts[]);
  }, []);

  const role = useMemo(
    () => user?.publicMetadata?.role,
    [user?.publicMetadata],
  );

  const isShow = useMemo(() => isLoaded && role === "user", [isLoaded, role]);

  const handleOpenOrCloseCart = () => {
    setCartIsOpen((state) => !state);
  };

  useEffect(() => {
    if (!isLoaded) return;

    if (role === "admin") {
      navigate("/admin");
    } else if (role === "user") {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isLoaded, role, navigate]);

  return (
    <>
      {isShow ? (
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
                className={`flex h-10 w-full items-center justify-center rounded-b-2xl bg-primary`}
              >
                <p className="flex items-center justify-center text-sm font-bold">
                  <Dot className="h-10 w-10 animate-pulse text-red-800" /> Loja
                  fechada - Abre amanhã às 14:00
                </p>
              </footer>
            </header>
            {separeteProductsType.map((item) => (
              <section className="mb-5 grid h-full w-full" key={item.type}>
                <h2 className="mb-2 flex items-center text-xl font-bold">
                  <ArrowRight /> {item.type}
                </h2>
                <div className="grid grid-cols-2 gap-5">
                  {item.content.map((item) => (
                    <CardProduct key={item.id} db={item} />
                  ))}
                </div>
              </section>
            ))}

            <div className="fixed bottom-5 right-10">
              <Button
                className={`flex h-12 w-60 items-center justify-center rounded-full bg-primary font-bold text-white transition-all duration-500 ${isAnimatingCart.isAnimating ? "w-72" : "w-12"}`}
                onClick={() => handleOpenOrCloseCart()}
              >
                {isAnimatingCart.isAnimating && (
                  <span className="font-bold">
                    {isAnimatingCart.situation === "ADD"
                      ? "Produto Adicionado!"
                      : "Produto Removido!"}
                  </span>
                )}
                {cart.length > 0 && (
                  <span className="absolute bottom-9 right-1 h-5 w-5 rounded-full bg-white text-center text-black">
                    {cart.length}
                  </span>
                )}
                <ShoppingCart />
              </Button>
            </div>
          </main>
          <Cart isOpen={cartIsOpen} handleOpenOrClose={handleOpenOrCloseCart} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
