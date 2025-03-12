"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface Transaction {
  id: string;
  sender: string;
  category: string;
  amount: string;
  date: string;
}

type PaginationProps = {
  search: string;
  category?: string;
  sort: "A" | "Z" | "High" | "Low" | "Latest";
};

const itemVariants = {
  hidden: (custom: number) => ({
    opacity: 0,
    y: custom % 2 === 0 ? -100 : 100,
  }),
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: custom * 0.2 },
  }),
};

export default function Pagination({
  search,
  category,
  sort,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/transactions")
      .then((response) => {
        response.data;
        let transactions: Transaction[] = response.data;

        if (search) {
          transactions = transactions.filter((transaction) =>
            transaction.sender.toLowerCase().includes(search.toLowerCase())
          );
        }

        if (category) {
          transactions = transactions.filter(
            (transaction) => transaction.category === category
          );
        }

        if (sort === "A") {
          transactions.sort((a, b) => a.sender.localeCompare(b.sender));
        } else if (sort === "Z") {
          transactions.sort((a, b) => b.sender.localeCompare(a.sender));
        } else if (sort === "High") {
          transactions.sort(
            (a, b) => parseFloat(b.amount) - parseFloat(a.amount)
          );
        } else if (sort === "Low") {
          transactions.sort(
            (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
          );
        } else if (sort === "Latest") {
          //   transactions.sort(
          //     (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          //   );
        }

        setTransactions(transactions);

        const indexOfLastTransaction = currentPage * usersPerPage;
        const indexOfFirstTransaction = indexOfLastTransaction - usersPerPage;

        setFilteredTransactions(
          transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
        );
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.error("Response data:", err.response.data); // Log response
          console.error("Response status:", err.response.status);
          console.error("Response headers:", err.response.headers);
        }
      });
  }, [search, category, sort, currentPage]);

  const pageNumbers = [];
  const totalPosts = transactions.length;

  for (let i = 1; i <= Math.ceil(totalPosts / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const prevPageDisabled = currentPage === 1;
  const nextPageDisabled = currentPage === pageNumbers.length;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <motion.div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id || `transaction-${index}`}
              variants={itemVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              className="flex justify-between items-center py-4 md:px-6 bg-white shadow-sm rounded-lg hover:bg-gray-50 transition ease-in-out"
            >
              <div className="flex items-center space-x-3 md:w-[240px] lg:w-[428px]">
                <div>
                  <h3 className="font-medium text-gray-800">
                    {transaction.sender}
                  </h3>
                  <h3 className="text-gray-600 w-[120px] md:hidden sm:flex">
                    {transaction.category}
                  </h3>
                </div>
              </div>
              <h3 className="text-gray-600 w-[120px] md:flex sm:hidden">
                {transaction.category}
              </h3>
              <h3 className="text-gray-600 sm:hidden md:flex">
                {/* {transaction.date
                  ? new Date(transaction.date).toISOString().split("T")[0]
                  : "Invalid Date"} */}
              </h3>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {transaction.amount}$
                </h3>
                <h3 className="text-gray-600 md:hidden">
                  {/* {transaction.date
                    ? new Date(transaction.date).toISOString().split("T")[0]
                    : "Invalid Date"} */}
                </h3>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      <div className="flex justify-between mt-[48px]">
        <button
          type="button"
          className="w-[94px] h-[40px] border-gray-300 rounded-md border-[1px] hover:bg-stone-500 transition duration-300"
          onClick={handlePrevPage}
          disabled={prevPageDisabled}
        >
          Prev
        </button>

        <div className="flex gap-[8px]">
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`w-[40px] h-[40px] border-gray-300 rounded-md border-[1px] ${
                currentPage === page
                  ? "bg-black text-white transition duration-500"
                  : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="w-[94px] h-[40px] border-gray-300 rounded-md border-[1px] hover:bg-stone-500 transition duration-300"
          onClick={handleNextPage}
          disabled={nextPageDisabled}
        >
          Next
        </button>
      </div>
    </>
  );
}
