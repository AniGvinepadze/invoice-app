"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";

export default function HomePageRecurringBills() {
  const router = useRouter();
  const handleClickBills = () => {
    router.push("/recurringbills");
  };

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
    <div className="grow basis-[428px] relative -z-10">
      <div className="mt-8 flex flex-col w-full space-y-6 ">
        <div className="bg-[#FFFFFF] p-[32px] md:h-[410px] h-[466px] rounded-xl flex-1">
          <div className="flex justify-between mb-3">
            <h5 className="text-[#201F24] text-[20px] font-bold leading-6">
              Recurring Bills
            </h5>
            <button
              className="text-[#696868] font-normal"
              onClick={handleClickBills}
            >
              See Details
            </button>
          </div>
          <div className="flex flex-col gap-[30px] ">
            <div className="flex justify-between items-center bg-[#F8F4F0] border-l-4 border-[#277C78] rounded-lg h-[61px] pl-[16px] pr-[16px]">
              <h5 className="text-[#696868] text-[20px] font-normal leading-6">
                Paid Bills
              </h5>
              <h5 className="font-bold text-[#201F24]">${amountSpent}</h5>
            </div>
            <div className="flex justify-between items-center bg-[#F8F4F0] border-l-4 border-[#F2CDAC] rounded-lg h-[61px] pl-[16px] pr-[16px]">
              <h5 className="text-[#696868] text-[20px] font-normal leading-6">
                Total Upcoming
              </h5>
              <h5 className="font-bold text-[#201F24]">${totalUpcoming}</h5>
            </div>
            <div className="flex justify-between items-center bg-[#F8F4F0] border-l-4 border-[#82C9D7] rounded-lg h-[61px] pl-[16px] pr-[16px]">
              <h5 className="text-[#696868] text-[20px] font-normal leading-6">
                Due Soon
              </h5>
              <h5 className="font-bold text-[#201F24]">${dueSoon}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
