// import mongoose from "mongoose";

// export async function dbConnect() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI as string);

//   } catch (error) {
//     console.log(error)
//   }
// }

import mongoose from "mongoose";



export const dbConnect = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI as string);
    if (connection.readyState === 1) {
      console.log("MongoDB Connected");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);

  }
};