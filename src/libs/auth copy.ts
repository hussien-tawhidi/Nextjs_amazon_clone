// import bcrypt from "bcryptjs";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { dbConnect } from "./dbConnect";
// import UserModel from "@/models/UserModel";
// import NextAuth from "next-auth";

// export const config = {
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: { type: "email" },
//         password: { type: "password" },
//       },
//       async authorize(credentials) {
//         await dbConnect();
//         if (credentials == null) return null;
//         const user = await UserModel.findOne({ email: credentials.email });

//         if (user) {
//           const isMatch = await bcrypt.compare(
//             credentials.password as string,
//             user.password
//           );
//           if (isMatch) return user;
//         }
//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signin: "/signin",
//     newUser: "/resgister",
//     error: "/signin",
//   },
//   callbacks: {
//     authorized({ request, auth }: any) {
//       const protectedPath = [
//         /\/shipping/,
//         /\/payment/,
//         /\/place-order/,
//         /\/profile/,
//         /\/order\/(.*)/,
//         /\/admin/,
//       ];
//       const { pathname } = request.nextUrl;
//       if (protectedPath.some((p) => p.test(pathname))) return !!auth;
//       return true;
//     },
//     async jwt({ user, trigger, session, token }: any) {
//       if (user) {
//         token.user = {
//           _id: user._id,
//           email: user.email,
//           name: user.name,
//           isAdmin: user.isAdmin,
//         };
//       }
//       if (trigger === "updated" && session) {
//         token.user = {
//           ...token.user,
//           email: session.user.email,
//           name: session.user.name,
//         };
//       }
//       return token;
//     },
//     session: async ({ session, token }: any) => {
//       if (token) {
//         session.user = token.user;
//       }
//       return session;
//     },
//   },
// };

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth(config);

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "./dbConnect";
import UserModel from "@/models/UserModel";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        if (credentials == null) return null;
        const user = await UserModel.findOne({ email: credentials.email });
        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          if (isMatch) return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    newUser: "/resgister",
    error: "/signin",
  },
  callbacks: {
    // authorized({ request, auth }: any) {
    //   const protectedPath = [
    //     /\/shipping/,
    //     /\/payment/,
    //     /\/place-order/,
    //     /\/profile/,
    //     /\/order\/(.*)/,
    //     /\/admin/,
    //   ];
    //   const { pathname } = request.nextUrl;
    //   if (protectedPath.some((p) => p.test(pathname))) return !!auth;
    //   return true;
    // },
    async jwt({ user, trigger, session, token }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        };
      }
      if (trigger === "updated" && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
        };
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  // providers: [
  //   GoogleProvider({
  //     clientId: process.env.GOOGLE_CLIENT_ID as string,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  //   }),
  //   CredentialsProvider({
  //     name: "Credentials",
  //     id: "credentials",
  //     credentials: {
  //       email: { label: "Email", type: "text", placeholder: "jsmith" },
  //       password: { label: "Password", type: "password" },
  //     },
  //     async authorize(credentials) {
  //       await dbConnect();
  //       const userFound = await User.findOne({
  //         email: credentials?.email,
  //       }).select("+password");
  //       if (!userFound) throw new Error("Invalid Email");
  //       const passwordMatch = await bcrypt.compare(
  //         credentials!.password,
  //         userFound.password
  //       );
  //       if (!passwordMatch) throw new Error("Invalid Password");
  //       return userFound;
  //     },
  //   }),
  // ],
  // pages: {
  //   signIn: "/login",
  // },
  // session: {
  //   strategy: "jwt",
  // },
  // callbacks: {
  //   async jwt({ token, user, session, trigger }) {
  //     if (trigger === "update" && session?.name) {
  //       token.name = session.name;
  //     }
  //     if (trigger === "update" && session?.email) {
  //       token.email = session.email;
  //     }
  //     if (user) {
  //       const u = user as unknown as any;
  //       return {
  //         ...token,
  //         id: u.id,
  //         phone: u.phone,
  //       };
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         _id: token.id,
  //         name: token.name,
  //         phone: token.phone,
  //       },
  //     };
  //   },
  // },
};
