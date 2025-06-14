"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Pagination from "@/app/components/moleculs/Transaction/Paginations";
type SortType = "A" | "Z" | "High" | "Low" | "Latest";

interface Transaction {
  sender: string;
  category: string;
  date: string;
  amount: number;
}

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<SortType>("Latest");
  const [isSortVisible, setIsSortVisible] = useState(false);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    sender: "",
    category: "",
    amount: 0,
    date: "",
  });


  const modalRef = useRef<HTMLDivElement>(null);
  const toggleSortVisibility = () => {
    setIsSortVisible((prev) => !prev);
  };

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
      [name]: type === "number" ? Number(value) || 0 : value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://invoiceappback.onrender.com/transactions",

        newTransaction
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
    }
  }, [loading]);

  // if (loading) {
  //   return <Spinner />;
  // }
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="p-8 w-full overflow-x-hidden overflow-scroll h-screen  ">
      <div className="mx-auto sm:mb-10 lg:mb-[0px]">
        <div className="flex justify-between max-500:flex-col">
          <h2 className="font-publicSans font-bold text-3xl md:text-4xl text-[#201F24] mb-6">
            Transactions
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black h-[53px] text-white px-6 py-3 rounded-lg  hover:bg-gray-700 transition-all ease-in-out duration-300"
          >
            + Add Transaction
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div ref={modalRef}  className="bg-white p-8 rounded-lg shadow-lg max-w-[560px] ml-6 mr-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-publicSans font-bold text-[32px] leading-[38px] text-[#201F24]  max-ss:text-[20px] ">
                  Add New Transaction
                </h3>
           
              </div>
              <p className="mb-[20px] font-publicSans font-normal text-[14px] leading-[21px] text-[#696868]">
                By creating a transaction, you’ll be able to get insights into
                your spending habits. Stay on top of your budget and take
                control of your finances!
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="sender"
                  placeholder="Recipient or Sender"
                  value={newTransaction.sender}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                  required
                />
                <select
                  onChange={(e) => {
                    const updatedCategory = e.target.value;
                    setNewTransaction((prevTransaction) => ({
                      ...prevTransaction,
                      category: updatedCategory,
                    }));
                  }}
                  name="category"
                  id="category"
                  className=" md:flex w-full p-2 mb-4 border border-gray-300 rounded-md"
                  value={newTransaction.category}
                  required
                >
                  <option value="">Choose Category</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Bills">Bills</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Dining Out">Dining Out</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Personal">Personal Care</option>
                </select>
                <input
                  type="date"
                  name="date"
                  placeholder="date"
                  value={newTransaction.date}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                  required
                />

                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={newTransaction.amount}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                  required
                />
                <button
                  type="submit"
                  className="bg-black h-[53px] w-full text-white px-6 py-3 rounded-lg  hover:bg-gray-700 transition-all ease-in-out duration-300"
                >
                  Add Transaction
                </button>
              </form>
            </div>
          </div>
        )}
        <div>
          <div className="flex justify-between m-6 mt-10 items-center max-800:m-0">
            <div className="flex-1 max-w-[690px] max-800:w-[100%] ">
              <input 
                type="text"
                className="border border-gray-300 rounded-md p-3  h-12 focus:outline-none focus:ring-2 focus:ring-blue-500  w-[100%]   max-800:my-5  "
                placeholder="Search transaction"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-6 items-center -mt-7 max-800:hidden">
              <div>
                <label
                  htmlFor="sortBy"
                  className="text-sm font-medium text-gray-700 sm:hidden md:flex"
                >
                  Sort By
                </label>
                {isSortVisible && (
                  <div className=" md:hidden absolute mt-2 bg-white shadow-md border rounded-md">
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setSort("Latest")}
                    >
                      Latest
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setSort("A")}
                    >
                      A to Z
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setSort("Z")}
                    >
                      Z to A
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setSort("High")}
                    >
                      Highest
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setSort("Low")}
                    >
                      Lowest
                    </div>
                  </div>
                )}
                <select
                  onChange={(e) => setSort(e.target.value as SortType)}
                  name="price"
                  id="price"
                  className=" sm:hidden md:flex w-32 h-12 border border-gray-300 rounded-md mt-2 text-gray-600 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ml-[8px]"
                >
                  <option value="Latest">Latest</option>
                  <option value="A">A to Z</option>
                  <option value="Z">Z to A</option>
                  <option value="High">Highest</option>
                  <option value="Low">Lowest</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-700 sm:hidden md:flex"
                >
                  Category
                </label>
                
                {isCategoryVisible && (
                  <div className="md:hidden absolute mt-2 bg-white shadow-md border rounded-md">
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setCategory("Entertainment")}
                    >
                      Entertainment
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setCategory("Bills")}
                    >
                      Bills
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setCategory("Groceries")}
                    >
                      Groceries
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setCategory("Dining Out")}
                    >
                      Dining Out
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setCategory("Transportation")}
                    >
                      Transportation
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setCategory("Personal")}
                    >
                      Personal Care
                    </div>
                  </div>
                )}
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  name="Category"
                  id="Category"
                  className=" sm:hidden md:flex w-40 h-12 border border-gray-300 rounded-md mt-2 text-gray-600 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ml-[8px]"
                >
                  <option value="">All Transaction</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Bills">Bills</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Dining Out">Dining Out</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Personal">Personal Care</option>
                </select>
              </div>
            </div>
          </div>
          <div className=" justify-between py-4 px-6 text-sm font-semibold text-gray-600 border-b border-gray-200 pb-4 mb-6 flex max-300:hidden">
            <h3 className="md:w-[240px] lg:w-[428px]">Recipient / Sender</h3>
            <h3 className="w-[120px] max-800:hidden">Category</h3>
            <h3>Amount</h3>
          </div>
          <Pagination search={search} sort={sort} category={category} />
        </div>
      </div>
    </div>
  );
}
