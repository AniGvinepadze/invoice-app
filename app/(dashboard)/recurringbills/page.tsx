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
        <motion.h2
          className="text-[32px] font-bold text-gray-900"
          initial={{ opacity: 1, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{
            once: true,
          }}
        >
          Recurring Bills
        </motion.h2>
        <AddNewBill handleClickShow={handleClickShow} />
      </div>

      <div className="w-full flex flex-raw gap-6 max-1250:flex-col">
     {/* <div className="max-w-[900px] w-full flex flex-col  max-1250:flex">
        <div className="flex flex-col gap-6 w-full  ">
          <motion.div
            className="p-6 h-[190px] bg-gray-900 rounded-lg"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{
              once: true,
            }}
          >
            <div className="h-[70px] flex flex-col justify-between">
              <span className="text-sm text-white">Total Bills</span>
              <span className="text-2xl text-white font-bold">
                ${totalBills}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="bg-white h-[190px] rounded-lg p-5"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{
              once: true,
            }}
          >
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
          </motion.div>
        </div>

        </div> */}
        <motion.div
          className="w-full max-w-[1440px] rounded-lg p-8 bg-white"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{
            once: true,
          }}
        >
          <div className="flex justify-between gap-2 mb-5 max-500:flex-col">
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

          <div className="hidden sm:flex justify-between text-sm my-10">
            <span className="text-base font-semibold ">Bill Title</span>
            <div className=" flex max-w-[280px] w-full justify-evenly">
              <span className="text-base font-semibold ">Due Date</span>
              <span className="text-base font-semibold ">Amount</span>
            </div>
          </div>

          <BillsList inputValue={value} option={option} bills={bills} />
        </motion.div>
      </div>

      {show && (
        <ReccuirngBillPopUp
          setShow={setShow}
          addBill={addBill}
          bills={bills}
          setBills={setBills}
          show={show}
        />
      )}
    </div>
  );
}
