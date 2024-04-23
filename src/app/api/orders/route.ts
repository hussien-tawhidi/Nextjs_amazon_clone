import { dbConnect } from "@/libs/dbConnect";
import { round2 } from "@/libs/utils";
import OrderModel from "@/models/OrderModel";
import ProductModel from "@/models/ProductModel";
import { OrderItem } from "@/types/types";
import { NextResponse } from "next/server";

const calcPrice = (orderItems: OrderItem[]) => {
  const itemsPrice = round2(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, totalPrice, taxPrice };
};

export const POST = async (req: any) => {

  try {
    const payload = await req.json();
    await dbConnect();

    //   get main price from service, check that price not changed from client side
    const dbProductPrice = await ProductModel.find(
      {
        _id: { $in: payload.items.map((x: { _id: string }) => x._id) },
      },
      "price"
    );

    const dbOrderItems = payload.items.map((x: { _id: string }) => ({
      ...x,
      product: x._id,
      price: dbProductPrice.find((x) => x._id === x._id).price,
      _id: undefined,
    }));

    const { itemsPrice, shippingPrice, totalPrice, taxPrice } =
      calcPrice(dbOrderItems);

    const newOrder = new OrderModel({
      items: dbOrderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      // user:user._id
      // user,
    });

    const createOrder = await newOrder.save();
    return NextResponse.json(
      {
        message: "Order has been created",
        order: createOrder,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        message: "Something went wrong in CREATING Order",
        error,
      },
      { status: 500 }
    );
  }
};
