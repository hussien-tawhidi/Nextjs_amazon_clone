import { dbConnect } from "@/libs/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import data from "../../../../../data";
import UserModel from "@/models/UserModel";
import ProductModel from "@/models/ProductModel";

export const GET = async (request: NextRequest) => {
  const { users, products } = data;
  await dbConnect();

  await UserModel.deleteMany();
  await UserModel.insertMany(users);

  await ProductModel.deleteMany();
  await ProductModel.insertMany(products);

    // return NextResponse.json("Hello")
    
  return NextResponse.json({
    message: "seed successfully",
    users,
    products,
  });
};
