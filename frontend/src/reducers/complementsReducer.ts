import { Actions, ComplementsType } from "./complementsTypes";

export const initialComplements: ComplementsType[] = [
  {
    id: 1,
    name: "Granola",
    quantity: 0,
  },
  {
    id: 2,
    name: "Amendoim",
    quantity: 0,
  },
  { id: 3, name: "Passas", quantity: 0 },
];

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
          ? { ...complement, quantity: complement.quantity + 1 }
          : complement,
      );
    }
    return [...state, { name: complementName, quantity: 1 }];
  };

  const decrementQuantityComplement = () => {
    const isAlready = state.find(
      (complement) => complement.name === complementName,
    );

    if (isAlready && isAlready.quantity > 0) {
      return state.map((complement) =>
        complement.name === isAlready.name && isAlready.quantity > 0
          ? { ...complement, quantity: complement.quantity - 1 }
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
