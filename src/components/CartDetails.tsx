"use client";

import useCartService from "@/hooks/useCartStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartDetails = () => {
  const { data: session } = useSession();
  console.log(session?.user?.name);
  const router = useRouter();
  const { items, itemsPrice, decrease, increase } = useCartService();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <>
      <div className='py-4 text-2xl'>Shopping cart</div>
      {items.length === 0 ? (
        <div className='flex items-center justify-center'>
          Cart is empty <Link href='/'>Go Shopping</Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            <div className='table'>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className='flex items-center'>
                        <Image
                          src={item.image}
                          width={50}
                          height={50}
                          alt='title'
                        />
                        <span className='px-2'>{item.name}</span>
                      </Link>
                    </td>
                    <td>
                      <button
                        className='btn'
                        type='button'
                        onClick={() => increase(item)}>
                        +
                      </button>
                      <span className='px-2'>{item.qty}</span>
                      <button
                        className='btn'
                        type='button'
                        onClick={() => decrease(item)}>
                        -
                      </button>
                    </td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </div>
          </div>
          <div className='card bg-base-300'>
            <div className='card-body'>
              <ul>
                <li>
                  <div className='pb-3 text-xl'>
                    Subtotal ({items.reduce((a, c) => a + c.qty, 0)}) : $
                    {itemsPrice}
                  </div>
                </li>
                <li>
                  {session ? (
                    <button
                      onClick={() => router.push("/shipping")}
                      className='btn btn-primary w-full'>
                      Procced to Checkout
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push("/cart")}
                      className='btn btn-primary w-full'>
                      Login to continue shipping
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDetails;
