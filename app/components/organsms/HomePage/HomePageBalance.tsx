import { balances } from "@/app/map";
import React from "react";

export default function HomePageBalance() {
  return (
    <div className="max-w-[1440px] w-full ">
      <div>
        <h2 className="font-bold text-[32px]">Overview</h2>
      </div>

      <div className="flex justify-between my-10 gap-3">
        {balances.map((el, index) => (
          <div key={el.id} className="max-w-[450px] w-full  ">
            <div
              className={`w-full rounded-xl p-4 ${
                index === 0 ? "bg-[#201F24] text-white" : "bg-white"
              }`}
            >
              <p
                className={`font-normal text-sm my-2 ${
                  index === 0 ? "text-white" : "text-[#696868]"
                }`}
              >
                {el.title}
              </p>

              <h3 className="font-bold text-[32px]">{el.budget}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
