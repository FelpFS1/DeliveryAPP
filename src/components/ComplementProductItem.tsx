import React from "react";
import { Minus, Plus } from "lucide-react";
import { ComplementsType } from "@/db/fakedb";

import {
  ComplementsActions,
  PaidComplementsActions,
} from "@/reducers/complements/complementsTypes";

type CombinedActions = PaidComplementsActions | ComplementsActions;

interface ComplementsProductTypes {
  complement: ComplementsType;
  handleDispatch: {
    dispatch: React.Dispatch<CombinedActions>;
    types: {
      increment: CombinedActions["type"];
      decrement: CombinedActions["type"];
    };
  };
  complementQuantity: number;
}
function ComplementProductItem({
  complement,
  handleDispatch: { dispatch, types },
  complementQuantity,
}: ComplementsProductTypes) {
  if (!complement.quantity) {
    complement.quantity = 0;
  }

  return (
    <div className="flex items-center justify-between border-b-2 bg-transparent p-4">
      <span>
        <p className="text-base font-medium">
          {complement.name} {complement.price ? "- R$" + complement.price : ""}
        </p>
      </span>
      <div className="flex items-center">
        <Minus
          className={`${complement.quantity < 1 ? "hidden" : ""}`}
          onClick={() => {
            dispatch({
              type: types.decrement,
              name: complement.name,
            });
          }}
        />

        <span className={`${complement.quantity < 1 ? "hidden" : ""}`}>
          {complement.quantity}
        </span>
        <Plus
          className={`${complementQuantity >= 3 ? "cursor-not-allowed" : "cursor-pointer"} ml-1 text-3xl text-red-400`}
          onClick={
            complementQuantity >= 3
              ? undefined
              : () => {
                  dispatch({
                    type: types.increment,
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
