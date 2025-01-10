export interface ComplementsType {
  name: string;
  price?: string;
  quantity?: number;
}

interface AdditionalTypes {
  complements: ComplementsType[];
  flavor: ComplementsType[];
  paidExtras: ComplementsType[];
}

export interface dbTypes {
  id: string;
  name: string;
  price: string;
  observation: string;
  service: string;
  productType: string;
  additional: AdditionalTypes;
}

export const db: dbTypes[] = [
  {
    id: "1",
    name: "açai 300ml",
    price: "16",
    observation:
      "Os complementos não são separados. Todos virão dentro do açai.",
    service: "1",
    productType: "Açai",
    additional: {
      complements: [
        {
          name: "Amendoim",
        },
        {
          name: "Paçoca",
        },
        {
          name: "Leite em pó",
        },
        {
          name: "Granola",
        },
        {
          name: "Confeites de chocolate",
        },
        {
          name: "chocoboll",
        },
      ],
      flavor: [
        {
          name: "Creme de chocolate",
          price: "free",
        },
        {
          name: "Creme de maracujá",
          price: "free",
        },
        {
          name: "Cupuaçu",
          price: "free",
        },
        {
          name: "Creme de ninho",
          price: "free",
        },
      ],
      paidExtras: [
        {
          name: "Nutela",
          price: "5",
        },
        {
          name: "Kiwi",
          price: "2",
        },
        {
          name: "Banana",
          price: "2",
        },
        {
          name: "Calda de morango",
          price: "2",
        },
        {
          name: "Calda de chocolate",
          price: "2",
        },
      ],
    },
  },
  {
    id: "2",
    name: "açai 500ml",
    price: "20",

    observation:
      "Os complementos não são separados. Todos virão dentro do açai.",
    service: "1",
    productType: "Açai",
    additional: {
      complements: [
        {
          name: "Amendoim",
        },
        {
          name: "Paçoca",
        },
      ],
      flavor: [
        {
          name: "Creme de chocolate",
        },
        {
          name: "Creme de maracujá",
        },
        {
          name: "Cupuaçu",
        },
        {
          name: "Creme de ninho",
        },
      ],
      paidExtras: [
        {
          name: "Nutela",
          price: "5",
        },
        {
          name: "Kiwi",
          price: "2",
        },
        {
          name: "Banana",
          price: "2",
        },
        {
          name: "Calda de morango",
          price: "2",
        },
        {
          name: "Calda de chocolate",
          price: "2",
        },
      ],
    },
  },
  {
    id: "3",
    name: "açai 500ml",
    price: "20",

    observation:
      "Os complementos não são separados. Todos virão dentro do açai.",
    service: "1",
    productType: "Petisqueira",
    additional: {
      complements: [
        {
          name: "Amendoim",
        },
        {
          name: "Paçoca",
        },
      ],
      flavor: [
        {
          name: "Creme de chocolate",
          price: "free",
        },
        {
          name: "Creme de maracujá",
          price: "free",
        },
        {
          name: "Cupuaçu",
          price: "free",
        },
        {
          name: "Creme de ninho",
          price: "free",
        },
      ],
      paidExtras: [
        {
          name: "Nutela",
          price: "5",
        },
        {
          name: "Kiwi",
          price: "2",
        },
        {
          name: "Banana",
          price: "2",
        },
        {
          name: "Calda de morango",
          price: "2",
        },
        {
          name: "Calda de chocolate",
          price: "2",
        },
      ],
    },
  },
];
