import { ComplementsType } from "@/reducers/complements/complementsTypes";

export interface AnimatingCartProps {
  situation?: "ADD" | "REMOVE";
  isAnimating: boolean;
}
export interface initialStateType {
  cart: ProductToCartType[];
  cartTotalPrice: number;
  isAnimatingCart: AnimatingCartProps;
}
export interface ProductToCartType {
  id?: string;
  name?: string;
  price?: string;
  totalPrice?: number;
  quantity?: number;
  simpleComplements?: ComplementsType[];
  paidComplements?: ComplementsType[];
  flavor?: string;
}
