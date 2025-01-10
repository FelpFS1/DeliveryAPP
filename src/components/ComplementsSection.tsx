import { useEffect, useMemo, useReducer } from "react";
import ComplementProductItem from "./ComplementProductItem";
import { ComplementsType } from "@/db/fakedb";

import { complementsReducer } from "@/reducers/complements/complementsReducer";
import { ProductToCartType } from "@/features/redux/types/cartProductType";

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
      <header className="mt-4 grid w-full grid-cols-2 rounded-md bg-gray-200 p-2 md:p-3">
        <div>
          <h4 className="font-bold md:text-lg">Complementos</h4>
          <p className="text-sm md:text-base">Escolha pelo menos 1 opção</p>
        </div>
        <div className="flex items-center justify-end gap-1 md:gap-4">
          <span
            className={`${quantityComplements > 0 ? "bg-green-400" : "bg-gray-400"} rounded p-1 text-sm uppercase md:px-2 md:font-medium`}
          >
            obrigatório
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
