import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import CardProduct from "./CardProduct";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useMemo, useReducer, useState } from "react";
import {
  complementsReducer,
  initialComplements,
} from "@/reducers/complementsReducer";
import { Check, Minus, Plus } from "lucide-react";
import React from "react";
import ComplementProductItem from "./ComplementProductItem";
import { RadioGroup } from "./ui/radio-group";
import FlavorProductItem from "./FlavorProductItem";
import { Button } from "./ui/button";

function Product() {
  const [complementsState, dispatch] = useReducer(
    complementsReducer,
    initialComplements,
  );

  const [flavorValue, setFlavorValue] = useState<string | undefined>(undefined);
  const quantityComplements = useMemo(() => {
    return complementsState.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);
  }, [complementsState]);

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
                        {quantityComplements}/3
                      </span>
                      <span
                        className={`${quantityComplements >= 1 ? "bg-green-400" : "bg-gray-400"} flex h-8 items-center rounded p-2 font-medium uppercase`}
                      >
                        obrigatório
                      </span>
                      <span
                        className={`${quantityComplements >= 1 ? "text-green-400 opacity-100" : "opacity-0"}`}
                      >
                        <Check />
                      </span>
                    </div>
                  </header>
                  {complementsState.map((complement) => (
                    <ComplementProductItem
                      complement={complement}
                      complementQuantity={quantityComplements}
                      dispatch={dispatch}
                    />
                  ))}
                </section>
                <section className="mb-14">
                  <header className="mt-4 grid w-full grid-cols-2 rounded-md bg-gray-200 p-3">
                    <div>
                      <h4 className="text-lg">Sabores</h4>
                      <p>Escolha até 1 sabor</p>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                      <span
                        className={`${flavorValue ? "text-green-400 opacity-100" : "opacity-0"}`}
                      >
                        <Check />
                      </span>
                    </div>
                  </header>
                  <RadioGroup onValueChange={(value) => setFlavorValue(value)}>
                    <FlavorProductItem value={"Maracujá"} />
                    <FlavorProductItem value={"Cupuaçu"} />
                    <FlavorProductItem value={"Manga"} />
                    <FlavorProductItem value={"Sem sabor"} />
                  </RadioGroup>
                </section>
                <div className="fixed bottom-2 flex w-1/2 items-center justify-between bg-white p-4">
                  <div className="flex items-center justify-center gap-3 rounded border p-2">
                    <Minus />

                    <span>1</span>
                    <Plus
                      className={`${quantityComplements >= 3 ? "cursor-not-allowed" : "cursor-pointer"} ml-1 text-3xl text-red-400`}
                    />
                  </div>
                  <div>
                    <Button disabled={quantityComplements < 1}>
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

export default React.memo(Product);
