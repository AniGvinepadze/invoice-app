"use client";

import React, { useEffect, useState } from "react";
import billData from "../../bills";
import billIcon from "../../../public/assets/bills.svg";
import Image from "next/image";

export default function RecurringBills() {
  const [billsList, setBillsList] = useState(billData);
  const [filteredBills, setFilteredBills] = useState(billData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [category, setCategory] = useState("All Transactions");
  const [totalBills, setTotalBills] = useState(0);
  const [paidBIlls, setPaidBills] = useState(0);
  const [unPaidBIlls, setUnPaidBills] = useState(0);
  const [quantityPaid, setQuantitiyPaid] = useState(0);
  const [quantityUnPaid, setQuantitiyUnPaid] = useState(0);

  useEffect(() => {
    let filtered = [...billsList];

    if (searchTerm) {
      filtered = filtered.filter((bill) =>
        bill.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== "All Transactions") {
      filtered = filtered.filter((bill) => bill.category === category);
    }

    switch (sortBy) {
      case "A to Z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z to A":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Lowest":
        filtered.sort((a, b) => a.amount - b.amount);
        break;
      case "Highest":
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      default:
        break;
    }

    setTotalBills(
      billsList
        .filter((bill) => bill.amount)
        .reduce((acc, bill) => acc + bill.amount, 0)
    );
    setFilteredBills(filtered);
    setPaidBills(
      billsList
        .filter((bill) => bill.isPaid)
        .reduce((acc, bill) => acc + bill.amount, 0)
    );
    setUnPaidBills(
      billsList
        .filter((bill) => !bill.isPaid)
        .reduce((acc, bill) => acc + bill.amount, 0)
    );
    setQuantitiyPaid(billsList.filter((bill) => bill.isPaid).length);
    setQuantitiyUnPaid(billsList.filter((bill) => !bill.isPaid).length);
  }, [searchTerm, sortBy, category, billsList]);

  return (
    <div className="p-1 max-w-[1440px] w-full overflow-x-hidden overflow-scroll h-screen ">
      <h2 className="font-bold text-[32px]  my-2">Recurring Bills</h2>
      <div className="flex flex-col xl:flex-row justify-between p-4 gap-8 ">
        <div className="flex flex-col  md:flex-col  w-full  gap-4 md:gap-0  ">
          <div className="bg-[#1A1C24] max-w-[1000px]  text-white flex flex-col items-start rounded-xl  p-6 mb-4">
            <Image
              src={billIcon}
              alt="Bill Icon"
              width={40}
              height={40}
              className="my-2"
            />
            <h4 className="text-sm font-normal mt-2">Total Bills</h4>
            <p className=" text-[32px] font-semibold">{totalBills}</p>
          </div>

          <div className="bg-white flex p-4 flex-col items-start rounded-md  max-w-[1000px] w-full ">
            <h3 className="text-base font-semibold mb-2">Summary</h3>
            <div className="flex justify-between w-full my-2">
              <p className="text-xs font-normal text-[#696868] mt-1">
                Paid Bills:
              </p>
              <p className="font-bold  ">
                {quantityPaid}({paidBIlls})
              </p>
            </div>
            <div className="w-full bg-[#d4d2d2] h-[1px] my-3 " />
            <div className="flex justify-between w-full">
              <p className="text-xs font-normal text-[#696868] my-1">
                Unpaid Bills:
              </p>
              <p className="font-bold">
                {quantityUnPaid}({unPaidBIlls})
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-[1050px]  w-full p-6 bg-white rounded-xl mt-4 md:mt-0 ">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 py-6 gap-3">
            <input
              type="text"
              placeholder="Search bills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            />

            <label className="font-normal text-sm text-[#696868]">Type</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 font-normal text-sm text-[#696868] focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            >
              <option value="All Transactions">All Transactions</option>
              <option value="Utilities">Utilities</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Technology">Technology</option>
            </select>

            <label className="mx-2 font-normal text-sm text-[#696868]">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 font-normal text-sm text-[#696868] focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            >
              <option value="Latest">Latest</option>
              <option value="A to Z">A to Z</option>
              <option value="Z to A">Z to A</option>
              <option value="Lowest">Lowest</option>
              <option value="Highest">Highest</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse text-left">
              <thead className="">
                <tr>
                  <th className="my-3 text-sm font-normal text-[#696868] ">
                    Bill Title
                  </th>
                  <th className="my-3  text-sm font-normal text-[#696868]">
                    Status
                  </th>
                  <th className="my-3  text-sm font-normal text-[#696868]">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {filteredBills.map((bill, index) => (
                  <tr
                    key={bill.name}
                    className={` hover:bg-gray-50 transition-colors ease-in-out duration-200 ${
                      index !== filteredBills.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <td className="py-2 flex items-center gap-4 my-1">
                      <span className="max-w-[40px] w-full rounded-md bg-gray-100 p-2 my-3 max-400:mt-3">
                        {bill.icon}
                      </span>
                      <span className="font-bold text-sm">{bill.name}</span>
                    </td>
                    <td
                      className={`py-2 font-normal text-xs  ${
                        bill.isPaid ? "text-[#277C78]" : "text-[#C94736]"
                      }`}
                    >
                      {bill.isPaid ? "✅" : "❌"}
                    </td>
                    <td className="py-2 font-bold text-sm">
                      ${bill.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
