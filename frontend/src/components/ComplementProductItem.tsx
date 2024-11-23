import { Actions, ComplementsType } from "@/reducers/complementsTypes";
import { Button } from "./ui/button";
import React from "react";
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
      className="flex items-center justify-between border-b-2 bg-transparent p-2"
    >
      <span aria-valuetext="Granola">
        <p>{complement.name}</p>
      </span>
      <div className="flex items-center">
        <Button
          className={`${complement.quantity < 1 ? "hidden" : "flex"} items-center border-0 p-4 text-3xl`}
          variant="outline"
          type="button"
          onClick={() => {
            dispatch({
              type: "DECREMENT_COMPLEMENT_QUANTITY",
              name: complement.name,
            });
          }}
        >
          <span className="text-2xl">-</span>
        </Button>
        <span className={`${complement.quantity < 1 ? "hidden" : ""} `}>
          {complement.quantity}
        </span>
        <Button
          className={`${complementQuantity >= 3 ? "cursor-not-allowed" : "cursor-pointer"} border-0 p-4 text-3xl text-red-400`}
          variant="outline"
          type="button"
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
        >
          +
        </Button>
      </div>
    </div>
  );
}

export default React.memo(ComplementProductItem);
