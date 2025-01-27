"use client";

import React, { useEffect, useState, useMemo } from "react";
import data from "../../transactions";
import { BillType } from "@/app/bills";
import Image from "next/image";
import { filter1, filter2, search } from "@/app";

interface Account {
  name: string;
  category: string;
  transaction_date: string;
  amount: string;
  icon?: React.ReactNode;
}

export default function Transition() {
  const [accounts, setAccounts] = useState<Account[]>(data);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("Latest");
  const [category, setCategory] = useState<string>("All Transactions");
  const [transactionType, setTransactionType] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;

  const filteredData = useMemo(() => {
    let filtered = [...accounts];

    if (searchTerm) {
      filtered = filtered.filter((account) =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== "All Transactions") {
      filtered = filtered.filter((account) => account.category === category);
    }

    if (transactionType !== "All") {
      filtered = filtered.filter((account) =>
        transactionType === "Income"
          ? account.amount.startsWith("+")
          : !account.amount.startsWith("+")
      );
    }

    switch (sortBy) {
      case "Latest":
        filtered.sort(
          (a, b) =>
            new Date(b.transaction_date).getTime() -
            new Date(a.transaction_date).getTime()
        );
        break;
      case "Oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.transaction_date).getTime() -
            new Date(b.transaction_date).getTime()
        );
        break;
      case "A to Z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z to A":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Lowest":
        filtered.sort(
          (a, b) =>
            parseFloat(a.amount.replace(/[^0-9.-]+/g, "")) -
            parseFloat(b.amount.replace(/[^0-9.-]+/g, ""))
        );
        break;
      case "Highest":
        filtered.sort(
          (a, b) =>
            parseFloat(b.amount.replace(/[^0-9.-]+/g, "")) -
            parseFloat(a.amount.replace(/[^0-9.-]+/g, ""))
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [accounts, searchTerm, sortBy, category, transactionType]);

  useEffect(() => {
    setFilteredAccounts(filteredData);
    setCurrentPage(1);
  }, [filteredData]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredAccounts.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredAccounts.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col items-center  h-screen p-6">
      <h2 className="font-bold text-[32px] p-4 w-full mb-6">Transactions</h2>
      <div className="bg-white max-w-[1060px] w-full rounded-xl  max-h-[960px] h-full overflow-y-auto p-4">
        <div className="flex items-center justify-between w-full mb-4 p-4  rounded-md max-1300:flex-wrap max-450:p-0">
          <div className="flex items-center border rounded-lg p-3 ">
            <input
              type="text"
              placeholder="Search transaction..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg "
            />
            <button className="text-gray-500">
              <Image src={search} alt="searchicon" width={16} height={16} />
            </button>
          </div>

          <div className="flex items-center mx-4 max-600:mx-0">
            <label className="mr-3 text-[#696868] font-normal text-sm max-600:hidden">
              Sort by
            </label>

            <button
              value={sortBy}
              className="cursor-pointer hidden max-600:flex"
              onChange={(e) => setSortBy("latest")}
            >
              <Image
                src={filter1}
                alt="filtericon"
                width={25}
                height={25}
                className="max-400:mt-6"
              />
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-2 cursor-pointer  text-[#696868] font-normal text-sm max-600:hidden"
            >
              <option
                value="Latest"
                className="text-base text-[#696868] font-medium "
              >
                Latest
              </option>
              <option
                value="Oldest"
                className="text-base text-[#696868] font-medium"
              >
                Oldest
              </option>
              <option
                value="A to Z"
                className="text-base text-[#696868] font-medium"
              >
                A to Z
              </option>
              <option
                value="Z to A"
                className="text-base text-[#696868] font-medium"
              >
                Z to A
              </option>
              <option
                value="Highest"
                className="text-base text-[#696868] font-medium"
              >
                Highest
              </option>
              <option
                value="Lowest"
                className="text-base text-[#696868] font-medium"
              >
                Lowest
              </option>
            </select>
          </div>

          <div className="flex items-center ">
            <label className="mr-3 text-[#696868] font-normal text-sm max-600:hidden">
              Category
            </label>
            <button
              value={sortBy}
              className="cursor-pointer hidden max-600:flex"
              onChange={(e) => setSortBy("latest")}
            >
              <Image
                src={filter2}
                alt="filtericon"
                width={25}
                height={25}
                className="max-400:mt-6 max-400:mr-32"
              />
            </button>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg px-3 py-2 max-600:hidden"
            >
              <option
                value="All Transactions"
                className="text-base text-[#696868] font-medium"
              >
                All Transactions
              </option>
              {Array.from(
                new Set(accounts.map((account) => account.category))
              ).map((cat, index) => (
                <option
                  key={index}
                  value={cat}
                  className="text-base text-[#696868] font-medium"
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center max-1300:my-4 ">
            <label className="mr-3 text-[#696868] font-normal text-sm max-600:hidden">
              Transaction Type
            </label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="border rounded-lg px-3 py-2 max-600:hidden"
            >
              <option
                value="All"
                className="text-base text-[#696868] font-medium"
              >
                All
              </option>
              <option
                value="Income"
                className="text-base text-[#696868] font-medium"
              >
                Income
              </option>
              <option
                value="Expense"
                className="text-base text-[#696868] font-medium"
              >
                Expense
              </option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full ">
            <thead>
              <tr className="max-600:hidden">
                <th className="p-5 text-left text-sm text-[#696868] font-medium">
                  Recipient / Sender
                </th>
                <th className="p-5 text-left text-sm text-[#696868] font-medium">
                  Category
                </th>
                <th className="p-5 text-left text-sm text-[#696868] font-medium">
                  Transaction Date
                </th>
                <th className="p-5 text-left text-sm text-[#696868] font-medium">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((account, index) => (
                <tr
                  key={index}
                  className="rounded-xl hover:bg-gray-50 transition-colors ease-in-out duration-300 "
                >
                  <td className="flex ">
                    <div className="max-w-[40px] w-full rounded-md bg-gray-100 p-2 my-3 max-400:mt-3">
                      {" "}
                      {account.icon}
                    </div>
                    <p className="m-4 font-semibold text-base text-[#575656] max-400:text-sm max-400:mt-6">
                      {account.name}
                    </p>
                  </td>
                  <td className="px-5 py-2 text-[#696868] font-normal text-sm max-600:hidden">
                    {account.category}
                  </td>
                  <td className="px-5 py-2 text-[#696868] font-normal text-sm max-600:hidden">
                    {account.transaction_date}
                  </td>
                  <td
                    className={`px-4 py-2 font-semibold text-base max-400:text-sm ${
                      account.amount.startsWith("+")
                        ? "text-green-500"
                        : "text-black"
                    }`}
                  >
                    {account.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 text-[#201F24] cursor-pointer border border-[#98908B] rounded-md mx-1 hover:bg-[#e3e2e1] transition-colors ease-in-out duration-300 disabled:opacity-50 max-550:px-2 "
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <div>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 text-[#201F24] cursor-pointer border border-[#98908B] rounded-md mx-1 hover:bg-[#e3e2e1] transition-colors ease-in-out duration-300 disabled:opacity-50 max-550:px-2 max-400:my-1 ${
                  currentPage === i + 1 ? "bg-[#201F24] text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 text-[#201F24] cursor-pointer border border-[#98908B] rounded-md mx-1 hover:bg-[#e3e2e1] transition-colors ease-in-out duration-300 disabled:opacity-50 max-550:px-2 "
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
