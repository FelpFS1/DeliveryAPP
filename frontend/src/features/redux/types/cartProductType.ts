import { ComplementsType } from "@/reducers/complements/complementsTypes";
export interface initialStateType {
  cart: ProductToCartType[];
  cartTotalPrice: number;
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
