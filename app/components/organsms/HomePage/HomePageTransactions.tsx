"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { IPots } from "@/app/(dashboard)/pots/page";
import Link from "next/link";

export default function HomePageTransactions() {
  const [potsData, setPostsData] = useState<IPots[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  type Transaction = {
    id: string;
    sender: string;
    amount: number;
    date: string;
  };
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    axios
      .get("https://invoiceappback.onrender.com/transactions")
      .then((response) => {
        const filteredData = response.data.slice(0, 5);
        setTransactions(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await axios.get("/pots");
      setPostsData(res.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grow basis-[608px] mt-8">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.9 }}
        viewport={{
          once: true,
        }}
        className="bg-[#FFFFFF] p-[32px] rounded-xl flex-1 mt-[24px]"
      >
        <div className="flex justify-between">
          <h5 className="text-[#201F24] text-[20px] font-bold leading-6 max-400:text-lg">
            Transactions
          </h5>
          <Link href="/transactions">
          <button className="font-normal text-sm text-[#696868] hover:text-[#a3a2a2] transition ease-in-out duration-200">View All</button>
          </Link>
        </div>
        <div className="mt-[35px] flex flex-col gap-[20px]">
          {transactions.map((user, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-4 md:px-6 bg-white shadow-sm rounded-lg hover:bg-gray-50 transition ease-in-out"
            >
              <div className="flex items-center space-x-3  md:w-[240px] lg:w-[428px]">
                <h3 className="font-medium text-gray-800">{user.sender}</h3>
              </div>
              <div className="w-full flex flex-col items-end">
                <h3 className="font-semibold text-gray-800">{user.amount}$</h3>
                <h3 className="text-gray-600">
                  {new Date(user.date).toISOString().split("T")[0]}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
