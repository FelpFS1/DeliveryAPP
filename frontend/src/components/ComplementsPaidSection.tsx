import { useEffect, useMemo, useReducer } from "react";
import ComplementProductItem from "./ComplementProductItem";
import { ComplementsType } from "@/reducers/complements/complementsTypes";

import { complementsPaidReducer } from "@/reducers/complements/complementsPaid";
import { ProductToCartType } from "@/features/redux/types/cartProductType";

interface PaidComplementsSectionProps {
  paidComplements: ComplementsType[];
  handleCreateProductToCart: (data: ProductToCartType) => void;
}

export default function ComplementsPaidSection({
  paidComplements,
  handleCreateProductToCart,
}: PaidComplementsSectionProps) {
  const [paidComplementsState, paidComplementsDispatch] = useReducer(
    complementsPaidReducer,
    paidComplements,
  );

  const { quantityPaidComplements, complementsExtras } = useMemo(() => {
    const complementsExtras = paidComplementsState
      .filter(
        (paidComplement) =>
          paidComplement?.quantity && paidComplement.quantity > 0,
      )
      .map((item) => ({
        ...item,
        price:
          item.price && item.quantity
            ? (+item.price * item.quantity).toString()
            : item.price,
      }));

    const quantityPaidComplements = paidComplementsState.reduce(
      (prev, curr) => {
        if (curr.quantity) {
          return prev + curr.quantity;
        }
        return prev;
      },
      0,
    );

    return { quantityPaidComplements, complementsExtras };
  }, [paidComplementsState]);

  useEffect(() => {
    if (complementsExtras) {
      handleCreateProductToCart({
        paidComplements: complementsExtras,
      });
    }
  }, [complementsExtras, handleCreateProductToCart]);

  return (
    <section className="mt-4">
      <header className="mt-4 w-full rounded-md bg-gray-200 p-3">
        <div>
          <h4 className="font-bold md:text-lg">Adicionais (pagos)</h4>
          <p className="text-sm md:text-base">Escolha até 3 opções</p>
        </div>
      </header>
      {paidComplementsState.map((complement) => (
        <ComplementProductItem
          key={complement.name}
          complement={complement}
          complementQuantity={quantityPaidComplements}
          handleDispatch={{
            dispatch: paidComplementsDispatch,
            types: {
              increment: "INCREMENT_PAID_COMPLEMENT_QUANTITY",
              decrement: "DECREMENT_PAID_COMPLEMENT_QUANTITY",
            },
          }}
        />
      ))}
    </section>
  );
}
