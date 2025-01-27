import React from "react";
import BudgetSection from "@/app/components/moleculs/BudgetSection/BudgetSection";

import { budget } from "@/app/map";
import imageProf from "@/public/assets/avatars/james-thompson.jpg";
import data from "@/data.json";
import Image from "next/image";
import BudgetModal from "@/app/components/organsms/BudgetModal/BudgetModal";
import { Progress } from "@/components/ui/progress";
function budgets() {
  const budgets = data.budgets;

  return (
    <main className="px-10  pt-8 pb-[48px] w-full overflow-x-hidden overflow-scroll h-screen w">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">Budget</h1>
        <BudgetModal />
      </div>
      <div className="flex flex-col   sm:flex-col lg:flex-row gap-6 h-full">
        <div className="flex   bg-white lg:self-start self-center  rounded-xl px-[20px] py-4 lg:p-8 flex-col  sm:flex-row lg:flex-col justify-between mt-10">
          <div className=" w-full mr-4">
            <BudgetSection />
          </div>
          <div className="flex flex-col justify-center">
            {budgets.map((el, i) => {
              return (
                <div key={i} className="flex gap-7 my-2 ">
                  <div
                    className={`w-1 h-full`}
                    style={{ background: el.theme }}
                  ></div>
                  <div>
                    <p className="font-normal text-xs text-[#696868]">
                      {el.category}
                    </p>
                    <p className="font-bold text-sm">{el.maximum}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-1  flex flex-col">
          <div className="flex  bg-white rounded-xl px-[20px] py-4 lg:p-8 flex-col   justify-between mt-10">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-green-500 rounded-full "></div>
              <h4 className="font-bold text-xl ">Entertainment</h4>
            </div>
            <span className="mt-[20px] font-[14px] leading-5 text-[#696868]">
              Maximum of $<span>50.00</span>
            </span>
            <div className="mt-4 h-3">
              <Progress value={40} className="bg-green-500 h-full" />
            </div>
            <div className="flex mt-4">
              <div className="flex gap-4 flex-1">
                <div className="w-[2px] h-full bg-green-500"></div>
                <div className="flex flex-col gap-1">
                  <span className="font-[12px] leading-4 text-[#696868]">
                    {" "}
                    Spent
                  </span>
                  <span className="font-bold text-[14px] leading-[21px] text-[#201f24]">
                    $<span>20.00</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-4 flex-1">
                <div className="w-[2px] h-full bg-[#f8f4f0]"></div>
                <div className="flex flex-col gap-1">
                  <span className="font-[12px] leading-4 text-[#696868]">
                    {" "}
                    Remaining
                  </span>
                  <span className="font-bold text-[14px] leading-[21px] text-[#201f24]">
                    $<span>35.00</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-[20px] bg-[#f8f4f0] rounded-[12px] p-[20px]">
              <div className="flex justify-between mb-6">
                <p className="font-bold text-base text-[#201f24]">
                  Latest Spending
                </p>
                <div className="text-[#696868] text-base">See All</div>
              </div>
              <div className="border-opacity-15 py-3 border-b border-b-[#696868]">
                <div className="flex justify-between ">
                  <div className="flex gap-4 items-center justify-center">
                    <div className="w-4 h-4 rounded-full overflow-hidden">
                      <Image
                        src={imageProf}
                        alt="profile"
                        className="w-full h-full"
                      />
                    </div>
                    <p className="font-bold text-sm ">James Thompson</p>
                  </div>
                  <div className="flex flex-col ">
                    <p className="text-[#201f24] self-end font-bold text-sm ">
                      -$5.00
                    </p>
                    <p className="font-normal text-sm text-[#696868]">
                      11 Aug 2024
                    </p>
                  </div>
                </div>
                <div className="w-full bg-[#F2F2F2] h-[1px] " />
              </div>
              <div className="py-3 border-opacity-15 border-b border-b-[#696868]">
                <div className="flex justify-between ">
                  <div className="flex gap-4 items-center justify-center">
                    <div className="w-4 h-4 rounded-full overflow-hidden">
                      <Image
                        src={imageProf}
                        alt="profile"
                        className="w-full h-full"
                      />
                    </div>
                    <p className="font-bold text-sm ">James Thompson</p>
                  </div>
                  <div className="flex flex-col ">
                    <p className="text-[#201f24] self-end font-bold text-sm ">
                      -$5.00
                    </p>
                    <p className="font-normal text-sm text-[#696868]">
                      11 Aug 2024
                    </p>
                  </div>
                </div>
                <div className="w-full bg-[#F2F2F2] h-[1px] " />
              </div>
              <div className="py-3 ">
                <div className="flex justify-between ">
                  <div className="flex gap-4 items-center justify-center">
                    <div className="w-4 h-4 rounded-full overflow-hidden">
                      <Image
                        src={imageProf}
                        alt="profile"
                        className="w-full h-full"
                      />
                    </div>
                    <p className="font-bold text-sm ">James Thompson</p>
                  </div>
                  <div className="flex flex-col ">
                    <p className="text-[#201f24] self-end font-bold text-sm ">
                      -$5.00
                    </p>
                    <p className="font-normal text-sm text-[#696868]">
                      11 Aug 2024
                    </p>
                  </div>
                </div>
                <div className="w-full bg-[#F2F2F2] h-[1px] " />
              </div>
            </div>
          </div>
          <div className="flex  bg-white rounded-xl px-[20px] py-4 lg:p-8 flex-col   justify-between mt-10">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-green-500 rounded-full "></div>
              <h4 className="font-bold text-xl ">Entertainment</h4>
            </div>
            <span className="mt-[20px] font-[14px] leading-5 text-[#696868]">
              Maximum of $<span>50.00</span>
            </span>
            <div className="mt-4 h-3">
              <Progress value={40} className="bg-green-500 h-full" />
            </div>
            <div className="flex mt-4">
              <div className="flex gap-4 flex-1">
                <div className="w-[2px] h-full bg-green-500"></div>
                <div className="flex flex-col gap-1">
                  <span className="font-[12px] leading-4 text-[#696868]">
                    {" "}
                    Spent
                  </span>
                  <span className="font-bold text-[14px] leading-[21px] text-[#201f24]">
                    $<span>20.00</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-4 flex-1">
                <div className="w-[2px] h-full bg-[#f8f4f0]"></div>
                <div className="flex flex-col gap-1">
                  <span className="font-[12px] leading-4 text-[#696868]">
                    {" "}
                    Remaining
                  </span>
                  <span className="font-bold text-[14px] leading-[21px] text-[#201f24]">
                    $<span>35.00</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-[20px] bg-[#f8f4f0] rounded-[12px] p-[20px]">
              <div className="flex justify-between mb-6">
                <p className="font-bold text-base text-[#201f24]">
                  Latest Spending
                </p>
                <div className="text-[#696868] text-base">See All</div>
              </div>
              <div className="border-opacity-15 py-3 border-b border-b-[#696868]">
                <div className="flex justify-between ">
                  <div className="flex gap-4 items-center justify-center">
                    <div className="w-4 h-4 rounded-full overflow-hidden">
                      <Image
                        src={imageProf}
                        alt="profile"
                        className="w-full h-full"
                      />
                    </div>
                    <p className="font-bold text-sm ">James Thompson</p>
                  </div>
                  <div className="flex flex-col ">
                    <p className="text-[#201f24] self-end font-bold text-sm ">
                      -$5.00
                    </p>
                    <p className="font-normal text-sm text-[#696868]">
                      11 Aug 2024
                    </p>
                  </div>
                </div>
                <div className="w-full bg-[#F2F2F2] h-[1px] " />
              </div>
              <div className="py-3 border-opacity-15 border-b border-b-[#696868]">
                <div className="flex justify-between ">
                  <div className="flex gap-4 items-center justify-center">
                    <div className="w-4 h-4 rounded-full overflow-hidden">
                      <Image
                        src={imageProf}
                        alt="profile"
                        className="w-full h-full"
                      />
                    </div>
                    <p className="font-bold text-sm ">James Thompson</p>
                  </div>
                  <div className="flex flex-col ">
                    <p className="text-[#201f24] self-end font-bold text-sm ">
                      -$5.00
                    </p>
                    <p className="font-normal text-sm text-[#696868]">
                      11 Aug 2024
                    </p>
                  </div>
                </div>
                <div className="w-full bg-[#F2F2F2] h-[1px] " />
              </div>
              <div className="py-3 ">
                <div className="flex justify-between ">
                  <div className="flex gap-4 items-center justify-center">
                    <div className="w-4 h-4 rounded-full overflow-hidden">
                      <Image
                        src={imageProf}
                        alt="profile"
                        className="w-full h-full"
                      />
                    </div>
                    <p className="font-bold text-sm ">James Thompson</p>
                  </div>
                  <div className="flex flex-col ">
                    <p className="text-[#201f24] self-end font-bold text-sm ">
                      -$5.00
                    </p>
                    <p className="font-normal text-sm text-[#696868]">
                      11 Aug 2024
                    </p>
                  </div>
                </div>
                <div className="w-full bg-[#F2F2F2] h-[1px] " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default budgets;
