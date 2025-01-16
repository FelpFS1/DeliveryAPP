import { dbTypes } from "@/db/fakedb";
import { CreditCard, Minus, Plus, ShoppingCart, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

import ComplementSection from "./ComplementsSection";
import ComplementsPaidSection from "./ComplementsPaidSection";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import FlavorSection from "./FlavorSection";
import { orderQuantityReducer } from "@/reducers/order/order-quantity";
import { ProductToCartType } from "@/features/redux/types/cartProductType";
import { useDispatch } from "react-redux";
import { addToCart, resetAnimation } from "@/features/redux/cart/cart-slice";
import { calculateTotalPrice } from "@/utils/calculateTotalPrice";

export default function CardProduct({ db }: { db: dbTypes }) {
  const dispatch = useDispatch();
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);

  const [orderQuantity, orderQuantityDispatch] = useReducer(
    orderQuantityReducer,
    1,
  );
  const [productToCart, setProductToCart] = useState<ProductToCartType>({
    name: db.name,
    price: db.price,
  } as ProductToCartType);

  const { complements, paidExtras } = db.additional;

  const handleCreateProductToCart = useCallback(
    (data: ProductToCartType) => {
      setProductToCart((state) => {
        return {
          ...state,
          ...data,
          quantity: orderQuantity,
        };
      });
    },
    [orderQuantity],
  );

  const handleAddProductToCart = () => {
    dispatch(addToCart(productToCart));
    setCartModalIsOpen(false);
    setTimeout(() => {
      dispatch(resetAnimation());
    }, 2000);
  };

  const calculatedPrice = useMemo(() => {
    return calculateTotalPrice(productToCart) * orderQuantity;
  }, [orderQuantity, productToCart]);

  useEffect(() => {
    if (!cartModalIsOpen) {
      orderQuantityDispatch({ type: "RESET_QUANTITY" });
    }
  }, [cartModalIsOpen]);
  return (
    <Dialog open={cartModalIsOpen} onOpenChange={setCartModalIsOpen}>
      <DialogTrigger onClick={() => setCartModalIsOpen(true)}>
        <div className="grid h-48 w-full cursor-pointer grid-cols-2 items-center rounded-2xl border-2 bg-white p-2 text-left shadow-md">
          <div className="flex flex-col gap-1 lg:gap-2">
            <h4 className="text-black">{db.name}</h4>
            <p className="text-gray-500">{db.observation}</p>
            <span className="flex gap-1 text-sm font-bold text-black md:text-base">
              <User className="" />
              Serve {db.service} pessoa
            </span>
            <span className="text-sm font-bold text-black lg:text-base">
              R${db.price},00
            </span>
          </div>
          <div className="flex justify-end md:mr-4">
            <img
              className="h-36 md:h-40"
              src="https://jusacai.com.br/assets/uploads/produtos/2/648765695540fic1iud.png"
              alt=""
            />
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="h-[91dvh] min-h-[92vh] w-[92vw] rounded-md md:h-[95vh] md:w-[95vw]">
        <div className="relative grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img
              className="w-[50%] md:w-[80%]"
              src="https://jusacai.com.br/assets/uploads/produtos/2/648765695540fic1iud.png"
              alt=""
            />
          </div>
          <div>
            <DialogHeader>
              <DialogTitle className="text-center">{db.name}</DialogTitle>
              <DialogDescription className="flex flex-col text-justify text-base md:text-xl">
                {db.observation}
                <span className="text-base font-bold md:text-xl">
                  R$ {db.price},00
                </span>
              </DialogDescription>
            </DialogHeader>
            <main className="relative">
              <form
                action=""
                className="max-h-[38vh] w-full justify-center overflow-y-auto md:max-h-[70vh] lg:max-h-[72vh]"
              >
                <ComplementSection
                  complements={complements}
                  handleCreateProductToCart={handleCreateProductToCart}
                />
                <ComplementsPaidSection
                  paidComplements={paidExtras}
                  handleCreateProductToCart={handleCreateProductToCart}
                />
                <FlavorSection
                  db={db}
                  handleCreateProductToCart={handleCreateProductToCart}
                />
                <div className="fixed bottom-0 flex w-full max-w-[90%] items-center justify-between bg-white p-4 md:left-1/2 md:w-1/2 md:px-4">
                  <div className="flex items-center gap-3 rounded border p-2">
                    <Minus
                      className="cursor-pointer"
                      onClick={() =>
                        orderQuantityDispatch({ type: "DECREMENT_QUANTITY" })
                      }
                    />

                    <span>{orderQuantity}</span>
                    <Plus
                      className="cursor-pointer"
                      onClick={() =>
                        orderQuantityDispatch({ type: "INCREMENT_QUANTITY" })
                      }
                    />
                  </div>
                  <div className="flex flex-row justify-center gap-2">
                    <Button
                      type="button"
                      onClick={() => handleAddProductToCart()}
                      disabled={
                        productToCart.simpleComplements &&
                        productToCart.simpleComplements?.length < 1
                      }
                    >
                      <ShoppingCart />

                      <span className="font-bold">R${calculatedPrice}</span>
                    </Button>
                    <Button
                      className="p-2 text-xs sm:p-4 sm:text-sm"
                      disabled={
                        productToCart.simpleComplements &&
                        productToCart.simpleComplements?.length < 1
                      }
                    >
                      <CreditCard />
                      <span className="font-bold">Pagamento</span>
                    </Button>
                  </div>
                </div>
              </form>
            </main>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
