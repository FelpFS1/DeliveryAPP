import { ComplementsType } from "@/db/fakedb";
import { PaidComplementsActions } from "./complementsTypes";

export function complementsPaidReducer(
  state: ComplementsType[],
  actions: PaidComplementsActions,
): ComplementsType[] {
  const complementName = actions.name;
  const incrementQuantityPaidComplement = () => {
    const isAlready = state.find(
      (complement) => complement.name === complementName,
    );

    if (isAlready) {
      return state.map((complement) =>
        complement.name === complementName
          ? {
              ...complement,
              quantity: complement.quantity ? complement.quantity + 1 : 1,
            }
          : complement,
      );
    }
    return [...state];
  };

  const decrementQuantityPaidComplement = () => {
    const isAlready = state.find(
      (complement) => complement.name === complementName,
    );

    if (isAlready && isAlready.quantity && isAlready.price) {
      return state.map((complement) =>
        complement.name === isAlready.name && isAlready.quantity
          ? {
              ...complement,
              quantity: complement.quantity ? complement.quantity - 1 : 1,
            }
          : complement,
      );
    }
    return state;
  };

  switch (actions.type) {
    case "INCREMENT_PAID_COMPLEMENT_QUANTITY":
      return incrementQuantityPaidComplement();
    case "DECREMENT_PAID_COMPLEMENT_QUANTITY":
      return decrementQuantityPaidComplement();
    default:
      return state;
  }
}
