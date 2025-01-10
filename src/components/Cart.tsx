import { DollarSign, X } from "lucide-react";
import { Button } from "./ui/button";
import CartItem from "./CartItem";
import { Dialog, DialogTrigger } from "./ui/dialog";
import AdressModal from "./AdressModal";
import { useSelector } from "react-redux";
import { RootState } from "@/features/redux/store";
import { useEffect } from "react";

interface CartPropsTypes {
  isOpen: boolean;
  handleOpenOrClose: () => void;
}

export default function Cart({ isOpen, handleOpenOrClose }: CartPropsTypes) {
  const { cart, cartTotalPrice } = useSelector(
    (state: RootState) => state.cart,
  );

  useEffect(() => {
    if (cart.length < 1) {
      if (isOpen) {
        handleOpenOrClose();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.length]);

  return (
    <div
      className={`${isOpen ? "block" : "hidden"} fixed inset-0 left-0 right-0 top-0 z-50 h-screen w-screen bg-black/80`}
    >
      <div
        className={`${
          isOpen ? "animate-slide-in-from-right" : "animate-slide-out-to-right"
        } absolute right-0 top-0 z-50 h-screen w-[80vw] bg-white md:w-[50vw] lg:w-[30vw]`}
      >
        <header className="relative mb-10 flex w-full items-center justify-center">
          <h2 className="text-center text-2xl">Carrinho</h2>
          <Button
            variant="outline"
            onClick={handleOpenOrClose}
            className="absolute right-2 top-2"
          >
            <X />
          </Button>
        </header>
        <main className="mb-10 h-full w-full overflow-auto">
          {cart.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </main>
        <footer className="absolute bottom-0 z-50 flex w-full items-center justify-between border-t bg-white p-1">
          <div className="flex flex-col">
            <p className="text-sm sm:text-base">Valor total:</p>
            <div className="flex flex-row items-center gap-1">
              <div className="flex h-4 w-4 items-center justify-center rounded-full border border-primary font-bold">
                <DollarSign className="text-primary" />
              </div>
              <span>{cartTotalPrice}</span>
            </div>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                {cart.length > 0 && (
                  <Button className="p-2 text-xs sm:p-4 sm:text-sm">
                    Prosseguir para pagamento
                  </Button>
                )}
              </DialogTrigger>
              <AdressModal />
            </Dialog>
          </div>
        </footer>
      </div>
    </div>
  );
}
