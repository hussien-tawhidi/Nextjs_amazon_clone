"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Form = () => {
  const { data: session } = useSession();

  const params = useSearchParams();
  let callbackUrl = params.get("callbackUrl") || "/";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password, name } = form;
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        return router.push(
          `/signin?callback=${callbackUrl}&success=Account has been registered`
        );
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message || error);
    }
  };

  return (
    <div className='max-w-sm mx-auto card bg-base-300 my-4'>
      <div className='card-body'>
        <h1 className='card-title'>Register</h1>
        {/* {params.get("error") && (
          <div className='alert text-error'>
            {params.get("error") === "CredentialsSignIn"
              ? "Invalid email or password"
              : params.get("error")}
          </div>
        )}
        {params.get("success") && (
          <div className='alert alert-success'>{params.get("success")}</div>
        )} */}
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className='my-2'>
            <label htmlFor='name' className='label'>
              Name
            </label>
            <input
              type='text'
              id='name'
              {...register("name", {
                required: "Name is required",
              })}
              className='input input-bordered w-full max-w-sm'
              placeholder='Your name ...'
            />
            {errors.name?.message && (
              <div className='text-error'>{errors.name.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label htmlFor='email' className='label'>
              Email
            </label>
            <input
              type='text'
              id='email'
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /[a-z0-9+@[a-z]+\.[a-z]{2,3}$/,
                  message: "Email is invalid",
                },
              })}
              className='input input-bordered w-full max-w-sm'
              placeholder='Write your email here...'
            />
            {errors.email?.message && (
              <div className='text-error'>{errors.email.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label htmlFor='password' className='label'>
              Password
            </label>
            <input
              type='password'
              id='password'
              {...register("password", {
                required: "Password is required",
              })}
              className='input input-bordered w-full max-w-sm'
              placeholder='Write your email here...'
            />
            {errors.password?.message && (
              <div className='text-error'>{errors.password.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label htmlFor='confirmPassword' className='label'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords do not match";
                },
              })}
              className='input input-bordered w-full max-w-sm'
              placeholder='Write your email here...'
            />
            {errors.confirmPassword?.message && (
              <div className='text-error'>{errors.confirmPassword.message}</div>
            )}
          </div>
          <div className='my-4'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='btn btn-primary w-full'>
              {isSubmitting && (
                <span className='loading loading-spinner'></span>
              )}
              Register
            </button>
          </div>
        </form>
        <p>
          Already have an account ?
          <Link href={`/register?callbackUrl/${callbackUrl}`} className='link'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Form;
