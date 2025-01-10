import {
  decrementQuantityCartItem,
  deleteCartItem,
  incrementQuantityCartItem,
  resetAnimation,
} from "@/features/redux/cart/cart-slice";
import { ProductToCartType } from "@/features/redux/types/cartProductType";
import {
  ChevronDown,
  ChevronUp,
  MinusIcon,
  PlusIcon,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
interface CartItemProps {
  cartItem: ProductToCartType;
}
export default function CartItem({ cartItem }: CartItemProps) {
  const [isShowInfo, setIsShowInfo] = useState(false);

  const dispath = useDispatch();

  const handleDeleteCartItem = () => {
    dispath(deleteCartItem(cartItem.id || ""));
    setTimeout(() => {
      dispath(resetAnimation());
    }, 2000);
  };
  return (
    <div
      className="mx-auto mb-2 w-[90%] cursor-pointer rounded-md border bg-white p-2 shadow-lg"
      onClick={() => setIsShowInfo((state) => !state)}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-3">
          <div
            className="flex items-center gap-1 px-1"
            onClick={() => setIsShowInfo((state) => !state)}
          >
            <MinusIcon
              size={20}
              onClick={() => dispath(decrementQuantityCartItem(cartItem.id))}
            />
            <span>{cartItem.quantity}</span>
            <PlusIcon
              size={20}
              onClick={() => dispath(incrementQuantityCartItem(cartItem.id))}
            />
          </div>
          <div
            className="flex flex-col"
            onClick={() => setIsShowInfo((state) => !state)}
          >
            <h3>{cartItem?.name}</h3>
            <p> R$ {cartItem.totalPrice}</p>
          </div>
        </div>
        <div
          className="flex cursor-pointer flex-row items-center gap-2"
          onClick={() => setIsShowInfo((state) => !state)}
        >
          <Trash size={20} onClick={() => handleDeleteCartItem()} />
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
