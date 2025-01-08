import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AnimatingCartProps,
  initialStateType,
  ProductToCartType,
} from "../types/cartProductType";
import { calculateTotalPrice } from "@/utils/calculateTotalPrice";

const initialState: initialStateType = {
  cart: [],
  cartTotalPrice: 0,
  isAnimatingCart: {} as AnimatingCartProps,
};

export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToCart: (state, action: PayloadAction<ProductToCartType>) => {
      const { paidComplements, price, quantity } = action.payload;
      if (paidComplements && price && quantity) {
        const productTotalPrice = calculateTotalPrice(action.payload);

        state.cart.push({
          ...action.payload,
          totalPrice: productTotalPrice,
          id: (Math.random() * 9999).toString(),
        });
        state.cartTotalPrice += productTotalPrice * quantity;
        state.isAnimatingCart = { isAnimating: true, situation: "ADD" };
      }
    },
    incrementQuantityCartItem: (state, action) => {
      let updatedTotalPrice = state.cartTotalPrice;
      state.cart.map((item) => {
        if (item.id === action.payload && item.quantity && item.totalPrice) {
          const updatedItem = {
            ...item,
            quantity: (item.quantity += 1),
          };
          updatedTotalPrice += updatedItem.totalPrice || 0;

          return updatedItem;
        }
        return item;
      });

      state.cartTotalPrice = updatedTotalPrice;
    },

    decrementQuantityCartItem: (state, action) => {
      let updatedTotalPrice = state.cartTotalPrice;
      state.cart = state.cart
        .map((item) => {
          if (item.id === action.payload && item.quantity && item.totalPrice) {
            const updatedItem = {
              ...item,
              quantity: (item.quantity -= 1),
            };
            updatedTotalPrice -= updatedItem.totalPrice || 0;

            return updatedItem;
          }
          return item;
        })
        .filter((item) => item.quantity && item.quantity > 0);

      state.cartTotalPrice = updatedTotalPrice;
    },
    deleteCartItem: (state, action: PayloadAction<string>) => {
      const indexCartItem = state.cart.findIndex(
        (item) => item.id === action.payload,
      );
      const removedCartItem = state.cart.splice(indexCartItem, 1);
      if (removedCartItem[0].totalPrice && removedCartItem[0].quantity)
        state.cartTotalPrice -=
          removedCartItem[0].totalPrice * removedCartItem[0].quantity;
      state.isAnimatingCart = { isAnimating: true, situation: "REMOVE" };
    },

    resetAnimation: (state) => {
      state.isAnimatingCart.isAnimating = false;
    },
  },
});

export const {
  addToCart,
  incrementQuantityCartItem,
  decrementQuantityCartItem,
  deleteCartItem,
  resetAnimation,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
