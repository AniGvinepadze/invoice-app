"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function HomePageBalance() {
  const [user, setUser] = useState<{ income: number; expenses: number } | null>(null);
  const [remainingBalance, setRemainingBalance] = useState<number | null>(null);

  const router = useRouter();

  const getCurrentUser = async (token: string) => {
    try {
      // Fetch transactions
      const res1 = await axios.get("http://localhost:3001/transactions");
      const transactions = res1.data;

      // Calculate total expenses
      const totalAmount = transactions.reduce(
        (sum: number, transaction: { amount: number }) => sum + transaction.amount,
        0
      );

      const initialBalance = 9597.25;
      setRemainingBalance(initialBalance - totalAmount);

      // Fetch user details
      const res2 = await axios.get("http://localhost:3001/auth/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res2.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      router.push("/login");
    }
  };

  useEffect(() => {
    const token = getCookie("auth_token");
    if (token) {
      getCurrentUser(token as string);
    }
  }, []);

  return (
    <div className="m-auto max-w-[1340px] w-full mb-10">
      <div className="flex justify-between mb-6">
        <h2 className="font-publicSans font-bold text-4xl text-[#201F24]">
          Overview
        </h2>
      </div>
      <div className="flex sm:flex-col md:!flex-row justify-between md:space-x-4 sm:gap-[12px] md:gap-0">
        <div className="bg-[#201F24] p-[24px] rounded-xl flex-1">
          <h5 className="text-[14px] font-normal text-[#FFFFFF]">Balance</h5>
          <h3 className="text-[32px] font-bold leading-8 text-[#FFFFFF] mt-[12px]">
            ${remainingBalance !== null ? remainingBalance.toFixed(2) : 0} 
          </h3>
        </div>
        <div className="bg-[#FFFFFF] p-[24px] rounded-xl flex-1">
          <h5 className="text-[14px] font-normal text-[#696868]">Income</h5>
          <h3 className="text-[32px] font-bold leading-8 text-[#201F24] mt-[12px]">
            ${user?.income ?? 0 }
          </h3>
        </div>
        <div className="bg-[#FFFFFF] p-[24px] rounded-xl flex-1">
          <h5 className="text-[14px] font-normal text-[#696868]">Expenses</h5>
          <h3 className="text-[32px] font-bold leading-8 text-[#201F24] mt-[12px]">
            ${user?.expenses ??  0}
          </h3>
        </div>
      </div>
    </div>
  );
}
