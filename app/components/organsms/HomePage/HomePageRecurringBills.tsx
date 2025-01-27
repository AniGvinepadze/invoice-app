import React from "react";
import Link from "next/link";
import { recBills } from "@/app/map";

export default function HomePageRecurringBills() {
  const borderColors = ["#277C78", "#F2CDAC", "#82C9D7"];
  return (
    <div className="max-w-[1000px] w-full bg-white rounded-xl p-7 ">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl max-450:text-base">Recurring Bills</h2>
        <div>
          <Link href="/recurringbills ">
            <p className="font-normal text-sm text-[#696868] hover:text-[#a3a2a2] transition ease-in-out duration-200">
              See Details
            </p>
          </Link>
        </div>
      </div>

      <div>
        {recBills.map((el, index) => (
          <div
            key={el.id}
            className="p-4 bg-[#F8F4F0] rounded-lg shadow my-3 border-l-4"
            style={{ borderLeftColor: borderColors[index] }}
          >
            <div className="flex justify-between items-center ">
              <p className="text-[#696868] font-normal text-sm">{el.title}</p>
              <p className="font-bold text-sm">{el.budget}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
