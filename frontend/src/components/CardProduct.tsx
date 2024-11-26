import { dbTypes } from "@/db/fakedb";
import { Check, Minus, Plus, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { RadioGroup } from "@radix-ui/react-radio-group";
import FlavorProductItem from "./FlavorProductItem";
import ComplementProductItem from "./ComplementProductItem";
import { useMemo, useReducer } from "react";
import { complementsReducer } from "@/reducers/complementsReducer";

export default function CardProduct({ db }: { db: dbTypes }) {
  const { complements } = db.additional;
  const [complementsState, dispatch] = useReducer(
    complementsReducer,
    complements,
  );

  const quantityComplements = useMemo(() => {
    return complementsState.reduce((prev, curr) => {
      if (curr.quantity) {
        return prev + curr.quantity;
      }
      return prev;
    }, 0);
  }, [complementsState]);
  return (
    <Dialog>
      <DialogTrigger>
        <div className="grid h-48 w-full cursor-pointer grid-cols-2 items-center rounded-2xl border-2 bg-white p-2 text-left shadow-md hover:bg-zinc-50">
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
                <section className="">
                  <header className="mt-4 grid w-full grid-cols-2 rounded-md bg-gray-200 p-3">
                    <div>
                      <h4 className="text-lg">Complementos</h4>
                      <p>Escolha pelo menos 1 opção</p>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                      <span className="flex items-center rounded bg-gray-400 p-1 font-medium">
                        {quantityComplements}/3
                      </span>
                      <span
                        className={`${quantityComplements > 0 ? "bg-green-400" : "bg-gray-400"} rounded px-2 py-1 font-medium uppercase`}
                      >
                        obrigatório
                      </span>
                      <span
                        className={`${quantityComplements > 0 ? "text-green-400 opacity-100" : "opacity-0"}`}
                      >
                        <Check />
                      </span>
                    </div>
                  </header>
                  {complementsState.map((complement) => (
                    <ComplementProductItem
                      key={complement.name}
                      complement={complement}
                      complementQuantity={quantityComplements}
                      dispatch={dispatch}
                    />
                  ))}
                </section>
                <section>
                  <header className="mt-4 grid w-full grid-cols-2 rounded-md bg-gray-200 p-3">
                    <div>
                      <h4 className="text-lg">Sabores</h4>
                      <p>Escolha até 1 sabor</p>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                      <span
                        className={`${quantityComplements > 0 ? "text-green-400 opacity-100" : "opacity-0"}`}
                      >
                        <Check />
                      </span>
                    </div>
                  </header>
                  <RadioGroup>
                    {db.additional.flavor.map((flavor) => (
                      <FlavorProductItem
                        key={flavor.name}
                        value={flavor.name}
                      />
                    ))}
                  </RadioGroup>
                </section>
                <section className="">
                  <header className="mt-4 grid w-full grid-cols-2 rounded-md bg-gray-200 p-3">
                    <div>
                      <h4 className="text-lg">Adicionais (pagos)</h4>
                      <p>Escolha pelo menos 1 opção</p>
                    </div>
                  </header>
                  {db.additional.paidExtras.map((complement) => (
                    <ComplementProductItem
                      key={complement.name}
                      complement={complement}
                      complementQuantity={quantityComplements}
                      dispatch={dispatch}
                    />
                  ))}
                </section>
                <div className="fixed bottom-2 flex w-1/2 items-center justify-between bg-white p-4">
                  <div className="flex items-center justify-center gap-3 rounded border p-2">
                    <Minus />

                    <span>1</span>
                    <Plus />
                  </div>
                  <div>
                    <Button>Adicionar</Button>
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
