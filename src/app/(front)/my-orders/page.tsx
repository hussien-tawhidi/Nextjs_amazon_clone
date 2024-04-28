"use client"

import useSWR from "swr";

const MyOrders = () => {
    const { data, error } = useSWR('/api/orders/user-orders');
  return <div></div>;
};

export default MyOrders;
