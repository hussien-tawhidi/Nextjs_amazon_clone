import { dbConnect } from "@/libs/dbConnect";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/models/UserModel";

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();
  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });


  try {
    await newUser.save();
    return Response.json({ message: "User has created" }, { status: 201 });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
};
