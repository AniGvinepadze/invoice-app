"use client";
import PieChartComponent from "@/app/components/moleculs/BudgetSection/BudgetSection";
import { budget } from "@/app/map";
import { useState } from "react";
import Image from "next/image";
import { title } from "process";

interface Budget {
  id: number;
  title: string;
  maxAmount: number;
  spent: number;
}

export default function BudgetPage() {
  const [isCategory, setIsCategory] = useState(false);
  const [isTheme, setIsTheme] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: 1,
      title: "Entertainment",
      maxAmount: 50.0,
      spent: 15.0,
    },
    {
      id: 2,
      title: "Bills",
      maxAmount: 750,
      spent: 150,
    },
  ]);

  const handleAddBudget = () => {
    const newBudget = {
      id: budget.length + 1,
      title: `New Budget ${budgets.length + 1}`,
      maxAmount: 100,
      spent: 0,
    };
    setBudgets((prev) => [...prev, newBudget]);
  };

  return (
    <div className="max-w-[1110px] w-full p-7 absolute">
      <div className="flex justify-between">
        <h2 className="font-bold text-[32px]">Budgets</h2>
        <button
          className="rounded-md bg-[#201F24] p-4 text-white font-bold text-sm max-w-[170px] w-full hover:bg-[#3c3b3c] transition-colors ease-in-out duration-300"
          onClick={() => setShowPopup(true)}
        >
          + Add New Budget
        </button>
      </div>

      {showPopup && (
        <div className="max-w-[560px] max-h-[490px] fixed inset-0 z-50 top-32 left-auto right-80 shadow-lg  bg-white p-7 rounded-xl">
          <div className="flex justify-between">
            <p className="font-bold text-[32px] ">Add New Budget</p>{" "}
            <button onClick={() => setShowPopup(false)}>close</button>
          </div>

          <div>
            <p className="text-[#696868] font-normal text-sm my-4">
              Choose a category to set a spending budget. These categories can
              help you monitor spending.
            </p>
          </div>
          <div className="flex flex-col">
            <label className="my-4 font-bold text-sm text-[#98908B]">
              Budget Category
            </label>
            <input
              className="relative rounded-md border p-4 w-full border-[#98908B]"
              value="Entertainment"
              onClick={() => setIsCategory((prev) => !prev)}
            />
            {isCategory && (
              <div className="w-full max-w-[400px] mt-28 shadow-md p-5 z-10 absolute bg-white rounded-xl">
                <p className="font-medium text-sm"> Entertainment</p>
                <div className="w-full bg-[#d5d2d0]  h-[1px] my-3 " />
                <p className="font-medium text-sm"> Bills</p>
                <div className="w-full bg-[#d5d2d0]  h-[1px] my-3 " />
                <p className="font-medium text-sm"> Groceries</p>
                <div className="w-full bg-[#d5d2d0]  h-[1px] my-3 " />
                <p className="font-medium text-sm"> Dining Out</p>
                <div className="w-full bg-[#d5d2d0] h-[1px] my-3" />
                <p className="font-medium text-sm"> Transportation</p>
                <div className="w-full bg-[#d5d2d0]  h-[1px] my-3 " />
                <p className="font-medium text-sm"> Personal Care</p>
                <div className="w-full bg-[#d5d2d0] h-[1px] my-3 " />
                <p className="font-medium text-sm"> Education</p>
              </div>
            )}

            <label className="my-4 font-bold text-sm text-[#98908B]">
              {" "}
              Maximum Spend
            </label>
            <input
              className="relative rounded-md border p-4 w-full border-[#98908B]"
              value="50.00"
            />

<div className="relative">
            <label className="my-4 font-bold text-sm text-[#98908B]">
              Theme
            </label>
            <input
              className="relative rounded-md border p-4 w-full border-[#98908B]"
              value="green"
              onClick={() => setIsTheme((prev) => !prev)}
            />
            {isTheme && (
              <div className="w-full max-w-[400px]  shadow-md p-5 absolute bg-white rounded-xl">
                <p className="font-medium text-sm"> Red</p>
                <div className="w-full bg-[#d5d2d0]  h-[1px] my-3 " />
                <p className="font-medium text-sm"> Green</p>
                <div className="w-full bg-[#d5d2d0]  h-[1px] my-3 " />
                <p className="font-medium text-sm"> Yallow</p>
                <div className="w-full bg-[#d5d2d0]  h-[1px] my-3 " />
                <p className="font-medium text-sm"> Navy</p>
                <div className="w-full bg-[#d5d2d0] h-[1px] my-3" />
                <p className="font-medium text-sm"> Cyan</p>
                <div className="w-full bg-[#d5d2d0]  h-[1px] my-3 " />
                <p className="font-medium text-sm"> Purple</p>
              </div>
              
            )}
            </div>
          </div>
        </div>
      )}

      <div className=" max-w-[428px] w-full bg-white rounded-xl p-5 ">
        <div className="flex justify-center items-center">
          <PieChartComponent />
        </div>
        <div>
          <p className="font-bold text-xl my-4">Spending Summary</p>
        </div>
        <div className="flex  ">
          <div>
            {budget.map((el) => (
              <div key={el.id}>
                <div className="flex gap-7 my-2 ">
                  <div className="">
                    <Image src={el.img} alt={el.title} width={3} height={0} />
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="font-normal text-xs text-[#696868] mt-1">
                        {el.title}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-sm mt-[1px] ">{el.budget}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-[#F2F2F2] h-[1px] my-3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
