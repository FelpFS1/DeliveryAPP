import { ProductToCartType } from "@/features/redux/types/cartProductType";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
interface CartItemProps {
  cartItem: ProductToCartType;
}
export default function CartItem({ cartItem }: CartItemProps) {
  const [isShowInfo, setIsShowInfo] = useState(false);
  return (
    <div
      className="mx-auto mb-2 w-[90%] cursor-pointer rounded-md border bg-white p-2 shadow-lg"
      onClick={() => setIsShowInfo((state) => !state)}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3>
            {cartItem?.quantity}x {cartItem?.name}
          </h3>
          <p> R$ {cartItem.totalPrice}</p>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => setIsShowInfo((state) => !state)}
        >
          {isShowInfo ? (
            <ChevronUp onClick={() => setIsShowInfo((state) => !state)} />
          ) : (
            <ChevronDown onClick={() => setIsShowInfo((state) => !state)} />
          )}
        </div>
      </div>
      <div
        className={`${isShowInfo ? "block" : "hidden"} w-full border-t py-4`}
      >
        <div>
          <span className="font-bold">Tipo:</span>
          <ul>
            <li>
              - {cartItem?.name} - R${cartItem?.price}
            </li>
          </ul>
          <span className="font-bold">Complementos:</span>
          <ul>
            {cartItem.simpleComplements?.map((simpleComplement) => (
              <li key={simpleComplement.name}>
                - {simpleComplement?.quantity}x {simpleComplement?.name}
              </li>
            ))}
          </ul>
          <span className="font-bold">Sabores: </span>
          <ul>
            <li> - {cartItem?.flavor}</li>
          </ul>
          <span className="font-bold">Adicionais:</span>
          <ul>
            {cartItem.paidComplements?.map((paidComplement) => (
              <li key={paidComplement.name}>
                {paidComplement?.quantity}x {paidComplement?.name} - R$
                {paidComplement?.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
