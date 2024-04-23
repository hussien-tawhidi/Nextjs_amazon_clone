"use client";
import { cartStore } from "@/hooks/useCartStore";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { SWRConfig } from "swr";

interface Props {
  children: React.ReactNode;
}

const SwrProvider = ({ children }: Props) => {
  const updateStore = () => {
    cartStore.persist.rehydrate();
  };

  useEffect(() => {
    document.removeEventListener("visibilitychange", updateStore);
    window.removeEventListener("focus", updateStore);
    return () => {
      document.removeEventListener("visibilitychange", updateStore);
      window.removeEventListener("focus", updateStore);
    };
  }, []);

  return (
    <SWRConfig
      value={{
        onError: (error, key) => {
          toast.error(error.message);
        },
        fetcher: async (resource, init) => {
          const res = await fetch(resource, init);
          if (!res.ok) {
            throw new Error("An error occurred while fetching data");
          }
          return res.json();
        },
      }}>
      {children}
    </SWRConfig>
  );
};

export default SwrProvider;
