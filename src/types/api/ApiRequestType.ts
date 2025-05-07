export type LoginRequest = {
  username: string;
  password: string;
};

export type ItemCreateRequest = {
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  minStock: number;
  location: string;
};
