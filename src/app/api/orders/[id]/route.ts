import { auth } from "@/libs/auth";
import { dbConnect } from "@/libs/dbConnect";
import OrderModel from "@/models/OrderModel";

export const GET = auth(async (...request: any) => {
  const [req, { params }] = request;
  if (!req.auth) {
    return Response.json({ message: "Unauthenticated" }, { status: 401 });
  }

  await dbConnect();

  const order = await OrderModel.findById(params.id);
  return Response.json({ order });
});
