import React from "react";
import Link from "next/link";
import { transaction } from "@/app/map";

export default function HomePageTransactions() {
  return (
    <div className="max-w-[1000px] w-full bg-white p-8 rounded-xl my-10">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl ">Transacitions</h2>
        <div>
          <Link href="/transactions">
            <p className="font-normal text-sm text-[#696868] hover:text-[#a3a2a2] transition ease-in-out duration-200">
              View more
            </p>
          </Link>
        </div>
      </div>
      <div className="mt-8">
        {transaction.map((el) => (
          <div key={el.id}>
            <div className="flex justify-between">
              <p className="font-bold text-sm mt-4">{el.name}</p>
              <div className="flex flex-col ">
                <p className="text-[#277C78] font-bold text-sm my-2">
                  {el.budget}
                </p>
                <p className="font-normal text-sm text-[#696868]">{el.date}</p>
              </div>
            </div>
            <div className="w-full bg-[#F2F2F2] h-[1px] my-5" />
          </div>
        ))}
      </div>
    </div>
  );
}
