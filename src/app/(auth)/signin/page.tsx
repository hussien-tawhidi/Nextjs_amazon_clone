import Form from "@/components/forms/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Login page ",
};

const SignIn = async () => {
  return <Form />;
};

export default SignIn;
