import { Action } from "redux";

export interface ComplementsType {
  name: string;
  quantity?: number;
  price?: string;
}

export interface ActionType extends Action {
  type: string;
  name: string;
}

export interface PaidComplementsActions {
  type:
    | "INCREMENT_PAID_COMPLEMENT_QUANTITY"
    | "DECREMENT_PAID_COMPLEMENT_QUANTITY";
  name: string;
}
export interface ComplementsActions {
  type: "INCREMENT_COMPLEMENT_QUANTITY" | "DECREMENT_COMPLEMENT_QUANTITY";
  name: string;
}

export type CombineActionTypes = PaidComplementsActions | ComplementsActions;
