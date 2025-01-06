import { ProductToCartType } from "@/features/redux/types/cartProductType";

export const calculateTotalPrice = (data: ProductToCartType) => {
  const { paidComplements, quantity, price } = data;
  if (paidComplements && quantity && price) {
    const totalPrice = paidComplements.reduce((prev, curr) => {
      if (curr.price) {
        return (prev += +curr.price);
      }
      return prev;
    }, 0);
    return (totalPrice + +price) * quantity;
  } else return 0;
};
