"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { setCookie } from "cookies-next";
import google from "../../../../public/assets/googlee.jpg";
import Image from "next/image";

export type FormData = {
  email: string;
  password: string;
  fullName?: string;
};

export default function LoginFormFields() {
  const [err, setError] = useState<null | string>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   const token = searchParams.get("token");

  //   if (token) {
  //     setCookie("accessToken", token, { maxAge: 60 * 60 });
  //     router.push("/");
  //   }
  // }, []);

  const getCurrentUser = async (token: string) => {
    try {
      const response = await axios.get(
        "https://invoiceappback.onrender.com/auth/current-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      getCurrentUser(token);
      setCookie("accessToken", token, { maxAge: 60 * 60 });
      console.log("shem,opbda");
      router.push("/");
    }
  }, [searchParams]);

  const onSubmit = async (formData: FormData) => {
    setError(null);
    try {
      const res = await axios.post(
        "https://invoiceappback.onrender.com/auth/sign-in",
        formData
      );
      setError(null);

      if (res.status === 201) {
        setCookie("accessToken", res.data.accessToken, { maxAge: 60 * 60 });

        
        router.push("/");
      }
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  const signInWithGoogle = () => {
    window.location.href = "https://invoiceappback.onrender.com/auth/google";
  };

  return (
    <div className="max-w-[600px] w-full m-32 max-1200:m-20 max-1100:m-16 max-550:m-6 max-400:m-3">
      <div className="shadow-md bg-white rounded-xl p-6 text-[#696868]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2 className="font-publicSans font-bold text-2xl">Login</h2>
          </div>

          <div className="flex flex-col mt-8">
            <label htmlFor="input" className="text-normal font-semibold my-3">
              Email
            </label>
            <input
              type="text"
              className="w-full h-[45px] rounded-lg border border-[#696868] p-2"
              {...register("email", {
                validate: {
                  notAdmin: (value) =>
                    value !== "admin@example.com" || "Reserved Email",
                  blackList: (value) => {
                    const blackList = ["mail.ru", "yandex.ru"];
                    const domain = value.split("@")[1];
                    if (!domain) return "Invalid Email Format";
                    return blackList.includes(domain)
                      ? "BlackListed Email"
                      : true;
                  },
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col mt-3">
            <label htmlFor="input" className="text-normal font-semibold my-3">
              Password
            </label>
            <input
              type="password"
              className="w-full h-[45px] rounded-lg border border-[#696868] p-2"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
            {err && <p className="text-red-500 text-xs italic">{err}</p>}
          </div>

          <div>
            <button
              className="w-full bg-[#201F24] text-normal font-semibold mt-8 text-white flex justify-center p-[13px] rounded-lg cursor-pointer hover:bg-[#696868] transition-colors ease-in-out duration-300"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        <button
          className="flex justify-center mt-6 gap-4 items-center w-full bg-white border border-[#201F24] rounded-lg p-2 cursor-pointer transition-colors ease-in-out duration-300"
          onClick={signInWithGoogle}
        >
          <p className="font-semibold text-normal ml-2 hover:text-[#201F24] cursor-pointer transition-colors ease-in-out duration-200 max-400:ml-0  ">
            Sign In With Google
          </p>
          <Image
            src={google}
            alt="google"
            width={30}
            height={30}
            className="object-contain max-400:w-[24px] max-400:h-[24px] max-300:w-[20px]  max-300:h-[20px]"
          />
        </button>

        <div className="flex justify-center mt-10">
          <p className="font-medium text-normal">
            Need to create an account?
            <Link
              href="/signUp"
              className="font-semibold text-normal ml-2 hover:text-[#201F24] cursor-pointer transition-colors ease-in-out duration-200 max-400:ml-0"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
