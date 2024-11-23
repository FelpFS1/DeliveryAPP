export interface ComplementsType {
  id?: number;
  name: string;
  quantity: number;
}

export interface Actions {
  type: "INCREMENT_COMPLEMENT_QUANTITY" | "DECREMENT_COMPLEMENT_QUANTITY";
  name: string;
}
