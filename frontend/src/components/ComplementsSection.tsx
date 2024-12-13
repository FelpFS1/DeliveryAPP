import { Check } from "lucide-react";
import { useEffect, useMemo, useReducer } from "react";
import ComplementProductItem from "./ComplementProductItem";
import { ComplementsType } from "@/db/fakedb";
import { complementsReducer } from "@/reducers/complementsReducer";
import { ProductToCartType } from "./CardProduct";

interface ComplementsSectionProps {
  complements: ComplementsType[];
  handleCreateProductToCart: (data: ProductToCartType) => void;
}

export default function ComplementSection({
  complements,
  handleCreateProductToCart,
}: ComplementsSectionProps) {
  const [complementsState, complementsDispatch] = useReducer(
    complementsReducer,
    complements,
  );
  const filteredComplements = useMemo(() => {
    return complementsState.filter(
      (complement) => complement?.quantity && complement.quantity > 0,
    );
  }, [complementsState]);

  const quantityComplements = useMemo(() => {
    return complementsState.reduce((prev, curr) => {
      if (curr.quantity) {
        return prev + curr.quantity;
      }
      return prev;
    }, 0);
  }, [complementsState]);

  useEffect(() => {
    if (filteredComplements) {
      handleCreateProductToCart({ simpleComplements: filteredComplements });
    }
  }, [filteredComplements, handleCreateProductToCart]);

  return (
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
          handleDispatch={{
            dispatch: complementsDispatch,
            types: {
              increment: "INCREMENT_COMPLEMENT_QUANTITY",
              decrement: "DECREMENT_COMPLEMENT_QUANTITY",
            },
          }}
        />
      ))}
    </section>
  );
}
