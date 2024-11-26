import { ComplementsType } from "@/db/fakedb";
import { Actions } from "./complementsTypes";

export function complementsReducer(
  state: ComplementsType[],
  actions: Actions,
): ComplementsType[] {
  const complementName = actions.name;

  const incrementQuantityComplement = () => {
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

  const decrementQuantityComplement = () => {
    const isAlready = state.find(
      (complement) => complement.name === complementName,
    );

    if (isAlready && isAlready.quantity) {
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
    case "INCREMENT_COMPLEMENT_QUANTITY":
      return incrementQuantityComplement();
    case "DECREMENT_COMPLEMENT_QUANTITY":
      return decrementQuantityComplement();
    default:
      return state;
  }
}
