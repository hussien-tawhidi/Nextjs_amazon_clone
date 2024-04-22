import { ValidationRule } from "react-hook-form";

export type Product = {
  _id?: string;
  name: string;
  slug: string;
  image: string;
  banner?: string;
  price: number;
  brand: string;
  description: string;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  colors?: [];
  sizes?: [];
};

export type OrderItem = {
  name?: string;
  slug?: string;
  qty: number;
  image: string;
  price?: number;
  color?: string;
  size?: string;
};

export type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  errors?:any
};

export type Cart = {
  items: OrderItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  paymentMethod: string;
  shippingAddress: ShippingAddress;
};

export type InputTypes = {
  id: typeof ShippingAddress;
  name: string;
  required?: boolean;
  pattern?: ValidationRule<RegExp>;
};
