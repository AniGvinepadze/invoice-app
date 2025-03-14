"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ReccuirngBillPopUp from "@/app/components/moleculs/bills/ReccuringBillPopup";
import AddNewBill from "@/app/components/moleculs/bills/AddNewBill";
import BillsList from "@/app/components/moleculs/bills/BillsList";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";

export default function RecurringBills() {
  const [value, setValue] = useState("");
  const [option, setOption] = useState("");
  const [show, setShow] = useState(false);
  const [bills, setBills] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const token = getCookie("accessToken") as string;

  useEffect(() => {
    const getCurrentUser = async () => {
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3001/auth/current-user",
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        router.push("/login");
      }
    };

    getCurrentUser();
  }, [token, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/reccuringbills",
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data, "response.dataresponse.data");
        setBills(response.data);
      } catch (err) {
        console.error("Error fetching bills:", err);
        console.error("Error fetching user:", err);
        router.push("/login");
      }
    };

    fetchData();
  }, []);

  const totalBills = bills.reduce((acc, el) => acc + el.amount, 0);
  const amountSpent = bills
    .filter((el) => el.status === "paid")
    .reduce((acc, el) => acc + el.amount, 0);
  const totalUpcoming = bills
    .filter((el) => el.status === "none")
    .reduce((acc, el) => acc + el.amount, 0);
  const dueSoon = bills
    .filter((el) => el.status === "unpaid")
    .reduce((acc, el) => acc + el.amount, 0);

  const handleClickShow = () => setShow(true);
  const addBill = (newBill: any) =>
    setBills((prevBills) => [...prevBills, newBill]);

  return (
    <div className="w-full overflow-x-hidden overflow-scroll h-screen py-6 px-4 sm:pt-8 sm:pb-24 sm:px-8 bg-[#F8F4F0]">
      <div className="w-full mb-8 flex sm:flex-row flex-col gap-y-2 justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Recurring Bills</h2>
        <AddNewBill handleClickShow={handleClickShow} />
      </div>

      <div className="w-full flex flex-col gap-6 sm:flex-col md:flex-row">
        <div className="flex flex-col gap-6 w-full max-w-[337px] sm:max-w-none md:max-w-[337px]">
          <div className="p-6 h-[190px] bg-gray-900 rounded-lg">
            <div className="h-[70px] flex flex-col justify-between">
              <span className="text-sm text-white">Total Bills</span>
              <span className="text-2xl text-white font-bold">
                ${totalBills}
              </span>
            </div>
          </div>

          <div className="bg-white h-[190px] rounded-lg p-5">
            <h5 className="text-lg text-gray-900 font-bold mb-5">Summary</h5>
            {[
              { label: "Amount Spent", value: amountSpent },
              { label: "Total Upcoming", value: totalUpcoming },
              { label: "Due Soon", value: dueSoon },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center h-9 border-b border-gray-300 text-sm"
              >
                <span>{label}</span>
                <span className="font-bold text-gray-900">${value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full rounded-lg p-8 bg-white">
          <div className="flex justify-between gap-2 mb-5">
            <input
              className="w-full h-12 pl-2 text-sm border border-gray-300 rounded-md outline-none"
              placeholder="Search bills"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <select
              className="px-5 py-2 border-2 border-gray-400 rounded-md"
              onChange={(e) => setOption(e.target.value)}
            >
              <option value="" disabled>
                Sort By
              </option>
              <option value="High">High</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="hidden sm:flex justify-between text-sm">
            <span>Bill Title</span>
            <div className="flex justify-between gap-2">
              <span>Due Date</span>
              <span>Amount</span>
            </div>
          </div>

          <BillsList inputValue={value} option={option} bills={bills} />
        </div>
      </div>

      {show && <ReccuirngBillPopUp setShow={setShow} addBill={addBill} />}
    </div>
  );
}
