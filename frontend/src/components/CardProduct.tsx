import { dbTypes } from "@/db/fakedb";
import { Minus, Plus, User } from "lucide-react";
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
import { ComplementsType } from "@/reducers/complements/complementsTypes";
import { useCallback, useReducer, useState } from "react";
import FlavorSection from "./FlavorSection";
import { orderQuantityReducer } from "@/reducers/order/order-quantity";

export interface ProductToCartType {
  id?: string;
  name?: string;
  price?: string;
  quantity?: number;
  simpleComplements?: ComplementsType[];
  paidComplements?: ComplementsType[];
  flavor?: string;
}

export default function CardProduct({ db }: { db: dbTypes }) {
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
    console.log(productToCart);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="grid h-48 w-full cursor-pointer grid-cols-2 items-center rounded-2xl border-2 bg-white p-2 text-left shadow-md">
          <div className="flex flex-col gap-2">
            <h4 className="text-black">{db.name}</h4>
            <p className="text-gray-500">{db.observation}</p>
            <span className="flex gap-1 font-bold text-black">
              <User />
              Serve {db.service} pessoa
            </span>
            <span className="font-bold text-black">R${db.price},00</span>
          </div>
          <div className="mr-4 flex justify-end">
            <img
              className="h-44"
              src="https://jusacai.com.br/assets/uploads/produtos/2/648765695540fic1iud.png"
              alt=""
            />
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="h-[95vh] w-[95vw]">
        <div className="grid grid-cols-2">
          <div className="">
            <img
              className="w-[80%]"
              src="https://jusacai.com.br/assets/uploads/produtos/2/648765695540fic1iud.png"
              alt=""
            />
          </div>
          <div>
            <DialogHeader>
              <DialogTitle className="text-center">{db.name}</DialogTitle>
              <DialogDescription className="flex flex-col text-xl">
                {db.observation}
                <span className="text-xl font-bold">R$ {db.price},00</span>
              </DialogDescription>
            </DialogHeader>
            <main>
              <form action="" className="h-[80vh] w-full overflow-y-auto">
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
                <div className="fixed bottom-2 flex w-1/2 items-center justify-between bg-white p-4">
                  <div className="flex items-center justify-center gap-3 rounded border p-2">
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
                  <div>
                    <Button
                      type="button"
                      onClick={() => handleAddProductToCart()}
                      disabled={
                        productToCart.simpleComplements &&
                        productToCart.simpleComplements?.length < 1
                      }
                    >
                      Adicionar
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
