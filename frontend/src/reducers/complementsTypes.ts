export interface ComplementsType {
  name: string;
  quantity: number;
  price: string;
}

export interface Actions {
  type: "INCREMENT_COMPLEMENT_QUANTITY" | "DECREMENT_COMPLEMENT_QUANTITY";
  name: string;
}
