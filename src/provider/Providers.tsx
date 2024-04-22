
// import { SessionProvider } from "next-auth/react";

// interface Props {
//   children: React.ReactNode;
// }

// const Providers = async ({ children }: Props) => {
  
//   return <SessionProvider>{children}</SessionProvider>;
// };

// export default Providers;

"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};