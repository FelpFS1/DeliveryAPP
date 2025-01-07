import { OrderQuantityActions } from "./order-quantity-types";

export function orderQuantityReducer(
  state: number,
  actions: OrderQuantityActions,
) {
  const incrementOrderQuantity = () => {
    return state + 1;
  };

  const decrementOrderQuantity = () => {
    return state > 1 ? state - 1 : 1;
  };

  const resetOrderQuantity = () => {
    return (state = 1);
  };
  switch (actions.type) {
    case "INCREMENT_QUANTITY":
      return incrementOrderQuantity();

    case "DECREMENT_QUANTITY":
      return decrementOrderQuantity();
    case "RESET_QUANTITY":
      return resetOrderQuantity();
    default:
      return state;
  }
}
