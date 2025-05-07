import { http, HttpResponse } from "msw";

// 더미 매대 + 상품 데이터
export const displays = [
  {
    name: "A",
    products: [
      { id: 1, name: "POSTER SET", price: 20000, stock: 24 },
      { id: 2, name: "KRUNK ORANGE", price: 20000, stock: 24 },
      { id: 3, name: "BAG SET", price: 15000, stock: 12 },
      { id: 4, name: "BOTTLE", price: 18000, stock: 8 },
    ],
  },
  {
    name: "B",
    products: [
      { id: 5, name: "KEYRING", price: 10000, stock: 30 },
      { id: 6, name: "POSTER SET", price: 20000, stock: 10 },
      { id: 7, name: "KEYRING", price: 10000, stock: 30 },
      { id: 8, name: "POSTER SET", price: 20000, stock: 10 },
      { id: 9, name: "KEYRING", price: 10000, stock: 30 },
      { id: 10, name: "POSTER SET", price: 20000, stock: 10 },
    ],
  },
];

export const ProductHandlers = [
  http.get("/items", () => {
    return HttpResponse.json(displays, { status: 200 });
  }),
];
