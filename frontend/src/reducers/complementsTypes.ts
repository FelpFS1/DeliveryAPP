export interface ComplementsType {
  name: string;
  quantity?: number;
  price?: string;
}

export interface ComplementsActions {
  type: "INCREMENT_COMPLEMENT_QUANTITY" | "DECREMENT_COMPLEMENT_QUANTITY";
  name: string;
}

export interface PaidComplementsActions {
  type:
    | "INCREMENT_PAID_COMPLEMENT_QUANTITY"
    | "DECREMENT_PAID_COMPLEMENT_QUANTITY";
  name: string;
}
