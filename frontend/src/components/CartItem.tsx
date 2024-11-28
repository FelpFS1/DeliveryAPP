import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function CartItem() {
  const [isShowInfo, setIsShowInfo] = useState(false);
  return (
    <div
      className="mx-auto mb-2 w-[90%] cursor-pointer rounded-md border bg-white p-2 shadow-lg"
      onClick={() => setIsShowInfo((state) => !state)}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3>1x Açai 300 ml</h3>
          <p> R$ 16,00</p>
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
          <span className="font-bold">Complementos:</span>
          <ul>
            <li> - 1x Amendoim</li>
            <li> - 1x Leite Condensado</li>
            <li> - 1x Leite em pó</li>
          </ul>
          <span className="font-bold">Sabores: </span>
          <ul>
            <li> - Maracujá</li>
          </ul>
          <span className="font-bold">Adicionais:</span>
          <ul>
            <li> - Kiwi - R$3,00</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
