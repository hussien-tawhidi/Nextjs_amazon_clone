import { auth } from "@/libs/auth";
import { productServices } from "@/libs/services/productServices";
import { OrderItem } from "@/types/types";
import Image from "next/image";
import { CiClock2 } from "react-icons/ci";
import moment from "moment";

const UserProfile = async () => {
  const session = await auth();
  // @ts-ignore
  const userId = session?.user?._id;

  const orders = await productServices.getOrder();
  var filterOrder = orders.filter(function (order) {
    return order.user == userId;
  });
  return (
    <div className='py-5 p-10'>
      <h1 className='text-5xl p-5'>User Orders</h1>
      <h6>User Name: {session?.user?.name}</h6>
      <h6>User Email: {session?.user?.email}</h6>
       {/* @ts-ignore */}
      <h6>UserID: {session?.user?._id}</h6>
      <div className='grid grid-cols-2'>
        {filterOrder.map((order) => (
          <div
            className='flex flex-col  gap-3 pt-3 shadow-md p-5'
            key={order._id}>
            <div className='flex gap-4  font-bold text-gray-600 border-b border-gray-300'>
              <p>Order ID: {order._id}</p>
              <p>UserID Ordered: {order.user}</p>
            </div>
            <h5 className='text-bold text-gray-700'>Shipping address</h5>
            <div className='flex gap-5 border-b border-gray-300'>
              <p>
                Full Name:{" "}
                <span className='text-gray-600'>
                  {order.shippingAddress.fullName}
                </span>
              </p>
              <p>
                Address:{" "}
                <span className='text-gray-600'>
                  {order.shippingAddress.address}
                </span>
              </p>
              <p>
                City:{" "}
                <span className='text-gray-600'>
                  {order.shippingAddress.city}
                </span>
              </p>
              <p>
                Postal Code:{" "}
                <span className='text-gray-600'>
                  {order.shippingAddress.postalCode}
                </span>
              </p>
              <p>
                Country:{" "}
                <span className='text-gray-600'>
                  {order.shippingAddress.country}
                </span>
              </p>
            </div>
            <div className='flex gap-5 border-b border-gray-300'>
              <h5 className='text-bold text-gray-700'>Payment Method</h5>
              <span>{order.paymentMethod}</span>
            </div>

            <div className='border-b border-gray-300'>
              {order.items.map((item: OrderItem) => (
                <div className='flex items-center gap-3' key={item.slug}>
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    alt='item'
                    className='object-cover'
                  />
                  <h6>title: {item.name}</h6>
                  <h6>Quantity: {item.qty}</h6>
                  <h6>Price: ${item.price}</h6>
                </div>
              ))}
            </div>
            <div className='flex gap-4 border-b border-gray-300'>
              <p>
                <span className='font-semibold'>Items Price:</span> $
                {order.itemsPrice}
              </p>
              <p>
                <span className='font-semibold'>Shipping Price:</span> $
                {order.shippingPrice}
              </p>
              <p>
                <span className='font-semibold'>Tax Price:</span> $
                {order.taxPrice}
              </p>
              <p>
                <span className='font-semibold'>Total Price:</span> $
                {order.totalPrice}
              </p>
            </div>
            <div className='flex gap-5 border-b border-gray-300'>
              <p>
                <span className='font-semibold'>Paid Status:</span>{" "}
                <span>{order.isPaid ? "Paid" : "NotPaid Yet"}</span>
              </p>
              <p>
                <span className='font-semibold'>Delivered Status:</span>{" "}
                <span>{order.isPaid ? "Delivered" : "Not Delivered Yet"}</span>
              </p>
            </div>
            <div className='flex items-center gap-3 border-b border-gray-300'>
              <span className='font-semibold'>CreatedAt:</span>
              <span className='flex items-center gap-1'>
                <CiClock2 /> {moment(order.createdAt).fromNow()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
