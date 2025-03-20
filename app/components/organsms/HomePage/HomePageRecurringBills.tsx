"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
export default function HomePageRecurringBills() {
  const router = useRouter();

  const token = getCookie("accessToken");
  const [bills, setBills] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/reccuringbills",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // const data = await response.json();
        setBills(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  let totalBills = 0;
  let amountSpent = 0;
  let totalUpcoming = 0;
  let dueSoon = 0;
  if (!Array.isArray(bills)) {
    console.error("bills is not an array", bills);
  } else {
    bills.forEach((el: any) => {
      totalBills += el.amount;

      if (el.status === "paid") {
        amountSpent += el.amount;
      } else if (el.status === "none") {
        totalUpcoming += el.amount;
      } else if (el.status === "unpaid") {
        // Fixed comparison
        dueSoon += el.amount;
      }
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.6}}
      viewport={{
        once: true,
      }}
      className="grow basis-[428px] relative -z-10"
    >
      <div className="mt-8 flex flex-col w-full space-y-6">
        <div className="bg-[#FFFFFF]  p-[32px] md:h-[410px] h-[466px] rounded-xl flex-1">
          <div className="flex justify-between mb-3">
            <h5 className="text-[#201F24] text-[20px] font-bold leading-6 max-400:text-lg">
              Recurring Bills
            </h5>

            <div>
              <Link href="/budgets">
                <p className="font-normal text-sm cursor-pointer text-[#696868] hover:text-[#a3a2a2] transition ease-in-out duration-200">
                  See Details
                </p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-[30px] mt-10 ">
            <div className="flex justify-between items-center bg-[#F8F4F0] border-l-4 border-[#277C78] rounded-lg h-[61px] pl-[16px] pr-[16px]">
              <h5 className="text-[#696868] text-[20px] font-normal leading-6 max-400:text-base">
                Paid Bills
              </h5>
              <h5 className="font-bold text-[#201F24]">$356</h5>
            </div>
            <div className="flex justify-between items-center bg-[#F8F4F0] border-l-4 border-[#F2CDAC] rounded-lg h-[61px] pl-[16px] pr-[16px]">
              <h5 className="text-[#696868] text-[20px] font-normal leading-6 max-400:text-base">
                Total Upcoming
              </h5>
              <h5 className="font-bold text-[#201F24]">$243</h5>
            </div>
            <div className="flex justify-between items-center bg-[#F8F4F0] border-l-4 border-[#82C9D7] rounded-lg h-[61px] pl-[16px] pr-[16px] ">
              <h5 className="text-[#696868] text-[20px] font-normal leading-6 max-400:text-base">
                Due Soon
              </h5>
              <h5 className="font-bold text-[#201F24]">$589</h5>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
