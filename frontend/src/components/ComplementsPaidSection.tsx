import { useEffect, useMemo, useReducer } from "react";
import ComplementProductItem from "./ComplementProductItem";
import { complementsPaidReducer } from "@/reducers/complementsPaid";
import { ComplementsType } from "@/reducers/complementsTypes";
import { ProductToCartType } from "./CardProduct";

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
    <section className="mb-12">
      <header className="mt-4 grid w-full grid-cols-2 rounded-md bg-gray-200 p-3">
        <div>
          <h4 className="text-lg">Adicionais (pagos)</h4>
          <p>Escolha até 3 opções</p>
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
