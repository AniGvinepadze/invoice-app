import React from "react";
import Image from "next/image";
// import { Active, billIcon, Overdue } from "@/utility/images/ImgExport";
import { filter } from "framer-motion/client";

type ListProps = {
  inputValue: string;
  option: string;
  bills: any[];
};

const BillsList: React.FC<ListProps> = ({ inputValue, option, bills }) => {
  const filteredDataByName = Array.isArray(bills)
    ? bills.filter((item: any) =>
        item.billTitle.toLowerCase().includes(inputValue.trim().toLowerCase())
      )
    : [];

  const filterFunction = (active: any, data: any) => {
    let filteredData = [...data];   

    switch (active) {
      case "High":
        return filteredData.sort((a, b) => b.amount - a.amount);
      case "Low":
        return filteredData.sort((a, b) => a.amount - b.amount);
      default:
        return filteredData;
    }
  };

  const filtered = filterFunction(option, filteredDataByName);
  console.log(filtered);

  return (
    <>
      {filtered.map((subscription: any, index: number) => (
        <div
          className={`mt-[24px] w-full sm:h-[53px] h-[61px] border-b-[1px] sm:flex gap-x-[10px] sm:justify-between border-gray-500 border-opacity-[15%] items-${
            index === 0 ? "start" : "center"
          }`}
          key={subscription._id}
        >
          <div className="max-w-[319px]  w-full flex gap-[16px]">
            {/* <Image alt="Icon" src={billIcon} width={30} height={30} /> */}
            <span className="text-[14px] font-bold ">
              {subscription.billTitle}
            </span>
          </div>
          <div className="flex justify-between gap-x-[10px] max-w-[252px] w-full">
            <div className="max-w-[120px] w-full flex gap-[8px]">
              <span
                className={`${
                  subscription?.status?.toLowerCase() === "paid"
                    ? "text-green-700"
                    : "text-gray-400"
                }`}
              >
                {subscription.frequency}-{subscription.date}
              </span>
            </div>
            <div className="max-w-[100px] w-full">
              <span className="text-[14px] font-bold">
                ${subscription.bill_amount}
                {console.log(subscription)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BillsList;
