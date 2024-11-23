import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import CardProduct from "./CardProduct";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useMemo, useReducer, useState } from "react";
import {
  complementsReducer,
  initialComplements,
} from "@/reducers/complementsReducer";
import { Check } from "lucide-react";
import React from "react";
import ComplementProductItem from "./ComplementProductItem";

function Product() {
  const [complementsState, dispatch] = useReducer(
    complementsReducer,
    initialComplements,
  );
  const [complementQuantity, setComplementQuantity] = useState(0);
  const quantityComplelents = useMemo(() => {
    return complementsState.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);
  }, [complementsState]);

  useEffect(() => {
    setComplementQuantity(quantityComplelents);
  }, [quantityComplelents]);
  return (
    <Dialog>
      <DialogTrigger>
        <CardProduct />
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
              <DialogTitle className="text-center">Açai 300ml</DialogTitle>
              <DialogDescription className="flex flex-col text-xl">
                Obs: Os complementos não são separados. Todos virão dentro do
                açai.
                <span className="text-xl font-bold">R$ 16,00</span>
              </DialogDescription>
            </DialogHeader>
            <main>
              <form action="" className="h-[80vh] w-full overflow-y-auto">
                <section className="">
                  <header className="mt-4 grid w-full grid-cols-2 rounded-md bg-gray-200 p-3">
                    <div>
                      <h4 className="text-lg">Complementos</h4>
                      <p>Escolha pelo menos 1 opção</p>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                      <span className="flex h-8 items-center rounded bg-gray-400 p-2 font-medium">
                        {complementQuantity}/3
                      </span>
                      <span
                        className={`${complementQuantity >= 1 ? "bg-green-400" : "bg-gray-400"} flex h-8 items-center rounded p-2 font-medium uppercase`}
                      >
                        obrigatório
                      </span>
                      <span
                        className={`${complementQuantity >= 1 ? "text-green-400 opacity-100" : "opacity-0"}`}
                      >
                        <Check />
                      </span>
                    </div>
                  </header>
                  {complementsState.map((complement) => (
                    <ComplementProductItem
                      complement={complement}
                      complementQuantity={complementQuantity}
                      dispatch={dispatch}
                    />
                  ))}
                </section>
              </form>
            </main>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(Product);
