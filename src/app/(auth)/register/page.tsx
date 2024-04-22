import { Metadata } from "next";
import Form from "../../../components/forms/Register";

export const metadata: Metadata = {
  title: "Register",
  description: "Register page ",
};


const Register = async () => {
  return <Form />;
};

export default Register;
