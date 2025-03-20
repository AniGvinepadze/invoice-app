"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { div } from "framer-motion/client";
import Image from "next/image";
import person from "../../../../public/assets/avatars/person.jpg";
import logout2 from "../../../../public/assets/avatars/logout2.png"

type Users = {
  fullName: string;
  email: string;
  _id: string;
  avatar: string;
  posts: string[];
};

export default function HomePageBalance() {
  //  const [users,setUsers] = useState<Users[]>([])
  const [user, setUser] = useState<{
    income: number;
    expenses: number;
    fullName: string;
    email: string;
    _id: string;
    avatar: string;
  } | null>(null);
  const [remainingBalance, setRemainingBalance] = useState<number | null>(null);

  const router = useRouter();

  const getCurrentUser = async (token: string) => {
    try {
      const res1 = await axios.get("https://invoiceappback.onrender.com/transactions");
      const transactions = res1.data;
      const totalAmount = transactions.reduce(
        (sum: number, transaction: { amount: number }) =>
          sum + transaction.amount,
        0
      );

      const initialBalance = 9597.25;

      setRemainingBalance(initialBalance - totalAmount);
      const res2 = await axios.get("https://invoiceappback.onrender.com/auth/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res2.data);
      console.log("User Avatar URL:", user?.avatar);
      console.log("User data response:", res2.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      router.push("/login");
    }
  };



  const signOut= () =>{
    deleteCookie('accessToken')
    router.push('/login')
  }

  useEffect(() => {
    const token = getCookie("accessToken");
    if (token) {
      getCurrentUser(token as string);
    }
  }, []);

  return (
    <div className="m-auto max-w-[1340px] w-full mb-10">
      <div className="flex justify-between mb-6 max-650:flex-col-reverse max-650:gap-4">
        <motion.h2
          className="font-publicSans font-bold text-4xl text-[#201F24] max-400:text-3xl  "
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{
            once: true,
          }}
        >
          Overview
        </motion.h2>

          <div className="max-w-[360px] w-full flex justify-between gap-3 max-400:mt-5 max-650:-ml-2"  >

        <div className="max-w-[260px] w-full bg-white rounded-lg  flex justify-center items-center gap-4 p-2 cursor-pointer hover:scale-110 transition-all ease-in-out duration-300  ">
          <Image
            src={user?.avatar?.startsWith("http") ? user.avatar : person}
            alt="User Avatar"
            width={35}
            height={35}
            className="rounded-full object-contain max-350:w-[27px]"

          />
          <h1 className="text-base font-semibold text-[#201F24] hover:text-[#6b6a6c] transition-all ease-in-out duration-300 max-350:text-sm">{user?.fullName}</h1>
          </div>
          <div className="max-w-[70px] w-full bg-white rounded-full p-3 flex justify-center cursor-pointer items-center hover:scale-110 transition-all ease-in-out duration-300  max-350:w-[50px] ">
             <button onClick={signOut}>
              <Image src={logout2} alt="logout" width={35} height={35} className="max-350:w-[25px]"/>
             </button>
          </div>

        </div>
      </div>

      <div className="flex justify-between md:space-x-4 sm:gap-[12px] md:gap-0 max-650:flex-col">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{
            once: true,
          }}
          className="bg-[#201F24] p-[24px] rounded-xl flex-1"
        >
          <h5 className="text-[14px] font-normal text-[#FFFFFF]">Balance</h5>
          <h3 className="text-[32px] font-bold leading-8 text-[#FFFFFF] mt-[12px]">
            ${remainingBalance !== null ? remainingBalance.toFixed(2) : 0}
          </h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{
            once: true,
          }}
          className="bg-[#FFFFFF] p-[24px] rounded-xl flex-1 max-650:my-4"
        >
          <h5 className="text-[14px] font-normal text-[#696868]">Income</h5>
          <h3 className="text-[32px] font-bold leading-8 text-[#201F24] mt-[12px]">
            ${user?.income ?? 674}
          </h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{
            once: true,
          }}
          className="bg-[#FFFFFF] p-[24px] rounded-xl flex-1"
        >
          <h5 className="text-[14px] font-normal text-[#696868]">Expenses</h5>
          <h3 className="text-[32px] font-bold leading-8 text-[#201F24] mt-[12px]">
            ${user?.expenses ?? 436}
          </h3>
        </motion.div>
      </div>
    </div>
  );
}
