"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FormData } from "../Login/LoginFormFields";

export default function SignUpFormFields() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="max-w-[600px] w-full m-32 max-1200:m-20 max-1100:m-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-md min-h-[422px] bg-white rounded-xl p-6 text-[#696868]"
      >
        <div>
          <h2 className="font-publicSans font-bold text-2xl">SignUp</h2>
        </div>

        <div className="flex flex-col mt-8 ">
          <label htmlFor="input" className="text-normal font-semibold my-3">
            Name
          </label>
          <input
            type="text"
            className="w-full h-[45px] rounded-lg border border-[#696868] p-2"
            {...register("name", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
          <p>
            {errors.password && (
              <span
                className="text-red-500
                  text-xs italic"
              >
                {errors.password.message}
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-col ">
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

          <p>
            {errors.email && (
              <span className="text-red-600 text-xs italic">
                {errors.email.message}
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-col mt-3 ">
          <label htmlFor="input" className="text-normal font-semibold my-3">
            Create Password
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
          <p>
            {errors.password && (
              <span
                className="text-red-500
                  text-xs italic"
              >
                {errors.password.message}
              </span>
            )}
          </p>
        </div>
        <div>
            <Link href="/login">
          <button
            className="w-full bg-[#201F24]  text-normal font-semibold my-8 text-white flex justify-center p-[13px] rounded-lg cursor-pointer hover:bg-[#696868] transition-colors ease-in-out duration-300"
            type="submit"
          >
          Create Account
          </button>
          </Link>
        </div>
        <div className="flex justify-center ">
          <p className="font-medium text-normal">
            Already have an account?
            <Link
              href="/login"
              className="font-semibold text-normal ml-2 hover:text-[#201F24] cursor-pointer transition-colors ease-in-out duration-200 max-400:ml-0"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
