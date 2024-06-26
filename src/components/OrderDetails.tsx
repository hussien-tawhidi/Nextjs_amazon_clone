"use client";

import { auth } from "@/libs/auth";
import { OrderItem } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

interface Props {
  orderId?: string;
  paymentClientId?: string;
}

const OrderDetailsComp = ({ orderId, paymentClientId }: Props) => {
  const session = auth();
  const { data, error } = useSWR(`/api/orders/${orderId}`);

  if (error) return error.message;
  if (!data) return "Loading...";

  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = data;

  return (
    <div>
      <h1 className='text-2xl py-4'>Order {orderId}</h1>
      <div className='grid md:grid-cols-4 md:gap-5 my-4'>
        <div className='md:col-span-3'>
          <div className='card bg-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p>
                {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              <p>
                {isDelivered ? (
                  <div className='text-success'>Delivered at {deliveredAt}</div>
                ) : (
                  <div className='text-error'>Not Delivered</div>
                )}
              </p>
            </div>
          </div>
          <div className='card bg-base-300 mt-4'>
            <div className='card-body'>
              <h2 className='card-title'>Payment Method</h2>
              <p>{paymentMethod}</p>
              {isPaid ? (
                <div className='text-success'>Paid at {paidAt}</div>
              ) : (
                <div className='text-error'>Not Paid</div>
              )}
            </div>
          </div>
          <div className='card bg-base-300 mt-4'>
            <div className='card-body'>
              <h2 className='card-title'>Items</h2>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item: OrderItem) => (
                    <tr key={item.slug}>
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <Image
                            src={item.image}
                            width={50}
                            height={50}
                            alt='title'
                            className='object-cover'
                          />
                          <span className='px-2'>
                            {item.name} ({item.color} {item.size})
                          </span>
                        </Link>
                      </td>
                      <td>{item.qty}</td>
                      <td>${item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='card bg-base-300'>
          <div className='card-body'>
            <h2 className='card-title'>Order Summary</h2>
            <ul>
              <li>
                <div className='mb-2 flex justify-between'>
                  <div>Items</div>
                  <div>${itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className='mb-2 flex justify-between'>
                  <div>Tax</div>
                  <div>${taxPrice}</div>
                </div>
              </li>
              <li>
                <div className='mb-2 flex justify-between'>
                  <div>Shipping</div>
                  <div>${shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className='mb-2 flex justify-between'>
                  <div>Total</div>
                  <div>${totalPrice}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsComp;
