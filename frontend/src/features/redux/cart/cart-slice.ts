import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateType, ProductToCartType } from "../types/cartProductType";
import { ComplementsType } from "@/reducers/complements/complementsTypes";

const initialState: initialStateType = {
  cart: [],
  cartTotalPrice: 0,
};

const calculateTotalPrice = (data: ComplementsType[]) => {
  const totalPrice = data.reduce((prev, curr) => {
    if (curr.price) {
      return (prev += +curr.price);
    }
    return prev;
  }, 0);
  return totalPrice;
};

export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToCart: (state, action: PayloadAction<ProductToCartType>) => {
      if (
        action.payload.paidComplements &&
        action.payload.price &&
        action.payload.quantity
      ) {
        const productTotalPrice =
          (calculateTotalPrice(action.payload.paidComplements) +
            +action.payload.price) *
          action.payload.quantity;

        state.cart.push({ ...action.payload, totalPrice: productTotalPrice });
        state.cartTotalPrice += productTotalPrice;
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
