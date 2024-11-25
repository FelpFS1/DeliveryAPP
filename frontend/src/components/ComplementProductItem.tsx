import { Actions, ComplementsType } from "@/reducers/complementsTypes";

import React from "react";
import { Minus, Plus } from "lucide-react";
interface ComplementsProductTypes {
  complement: ComplementsType;
  dispatch: React.Dispatch<Actions>;
  complementQuantity: number;
}
function ComplementProductItem({
  complement,
  dispatch,
  complementQuantity,
}: ComplementsProductTypes) {
  return (
    <div
      key={complement.name}
      className="flex items-center justify-between border-b-2 bg-transparent p-4"
    >
      <span>
        <p className="text-base font-medium">{complement.name}</p>
      </span>
      <div className="flex items-center">
        <Minus
          className={`${complement.quantity < 1 ? "hidden" : "flex"} mr-1 cursor-pointer items-center text-3xl`}
          onClick={() => {
            dispatch({
              type: "DECREMENT_COMPLEMENT_QUANTITY",
              name: complement.name,
            });
          }}
        />

        <span className={`${complement.quantity < 1 ? "hidden" : ""} `}>
          {complement.quantity}
        </span>
        <Plus
          className={`${complementQuantity >= 3 ? "cursor-not-allowed" : "cursor-pointer"} ml-1 text-3xl text-red-400`}
          onClick={
            complementQuantity >= 3
              ? undefined
              : () => {
                  dispatch({
                    type: "INCREMENT_COMPLEMENT_QUANTITY",
                    name: complement.name,
                  });
                }
          }
        />
      </div>
    </div>
  );
}

export default React.memo(ComplementProductItem);
