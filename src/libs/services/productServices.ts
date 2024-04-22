import { cache } from "react";
import { dbConnect } from "../dbConnect";
import ProductModel from "@/models/ProductModel";
import { Product } from "@/types/types";

const getLates = cache(async () => {
  await dbConnect();

  const products = await ProductModel.find({})
    .sort({ _id: -1 })
    .limit(4)
    .lean();

  return products as Product[];
});

const getFeatured = cache(async () => {
  await dbConnect();
  const products = await ProductModel.find({ isFeatured: true })
    .limit(3)
    .lean();

  return products as Product[];
});

const getBySlug = cache(async (slug: string) => {
  await dbConnect();
  const product = await ProductModel.findOne({ slug }).lean();
  return product as Product;
});

export const productServices = { getLates, getBySlug, getFeatured };
