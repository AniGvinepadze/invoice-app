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
};

export default function ResendVerificationForm() {
  const [err, setError] = useState<null | string>(null);

  const router = useRouter();
  const searchParams = useSearchParams(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

//   const getCurrentUser = async (token: string) => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3001/auth/current-user",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const token = searchParams.get("token"); 
//     if (token) {
//       getCurrentUser(token);
//       setCookie("accessToken", token, { maxAge: 60 * 60 });

//       router.push("/home");
//     }
//   }, [searchParams]); 


  const onSubmit = async (formData: FormData) => {
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:3001/auth/resend-verification",
        formData
      );
      setError(null);

      if (res.status === 201) {
        // setCookie("accessToken", res.data.accessToken, { maxAge: 60 * 60 });

        router.push("/verify");
      }
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };


  return (
    <div className="max-w-[600px] w-full m-32 max-1200:m-20 max-1100:m-16 max-550:m-6 max-400:m-3">
      <div className="shadow-md bg-white rounded-xl p-6 text-[#696868]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2 className="font-publicSans font-bold text-2xl max-350:text-xl">Resend Verification</h2>
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


          <div>
            <button
              className="w-full bg-[#201F24] text-normal font-semibold mt-8 text-white flex justify-center p-[13px] rounded-lg cursor-pointer hover:bg-[#696868] transition-colors ease-in-out duration-300"
              type="submit"
            >
              Resend Verification
            </button>
          </div>
         
        </form>
      
        
      </div>
    </div>
  );
}
