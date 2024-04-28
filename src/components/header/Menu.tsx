"use client";
import { FaAngleDown } from "react-icons/fa6";
import useCartService from "@/hooks/useCartStore";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Menu = () => {
  const router=useRouter()
  const { items } = useCartService();
  const [mount, setMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const signoutHandler = () => {
    signOut({ callbackUrl: "/signin" });
  };

  return (
    <ul className='flex items-stretch'>
      <li>
        <Link href='/cart' className='btn btn-ghost rounded-btn'>
          Cart
          {mount && items.length != 0 && (
            <div className='badge badge-secondary'>
              {items.reduce((a, c) => a + c.qty, 0)}
            </div>
          )}
        </Link>
      </li>
      {session && session.user ? (
        <>
          <li>
            <div className='dropdown dropdown-bottom dropdown-end'>
              <label className='btn btn-ghost rounded-btn' tabIndex={0}>
                {session.user.name}
                <FaAngleDown />
              </label>
              <ul className='menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded'>
                <li>
                  <button type='button' onClick={()=>router.push(`/profile/${session?.user?._id}`)}>
                    Profile
                  </button>
                </li>
                <li>
                  <button type='button' onClick={signoutHandler}>
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </>
      ) : (
        <li>
          <button
            className='btn btn-ghost rounded-btn'
            type='button'
            onClick={() => signIn()}>
            Sign in
          </button>
        </li>
      )}
    </ul>
  );
};

export default Menu;
