import { X } from "lucide-react";
import { Button } from "./ui/button";
import CartItem from "./CartItem";
import { Dialog, DialogTrigger } from "./ui/dialog";
import AdressModal from "./AdressModal";
import { useSelector } from "react-redux";
import { RootState } from "@/features/redux/store";

interface CartPropsTypes {
  isOpen: boolean;
  handleOpenOrClose: () => void;
}

export default function Cart({ isOpen, handleOpenOrClose }: CartPropsTypes) {
  const { cart, cartTotalPrice } = useSelector(
    (state: RootState) => state.cart,
  );

  return (
    <div
      className={`${isOpen ? "block" : "hidden"} fixed inset-0 left-0 right-0 top-0 z-50 h-screen w-screen bg-black/80`}
    >
      <div
        className={`${
          isOpen ? "animate-slide-in-from-right" : "animate-slide-out-to-right"
        } absolute right-0 top-0 z-50 h-screen w-[30vw] bg-white`}
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
        <footer className="absolute bottom-0 z-50 flex w-full items-center justify-between border-t bg-white p-4">
          <div className="flex flex-col">
            <p>Valor total:</p>
            <span>RS{cartTotalPrice}</span>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Prosseguir para pagamento</Button>
              </DialogTrigger>
              <AdressModal />
            </Dialog>
          </div>
        </footer>
      </div>
    </div>
  );
}
