import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dollarIcon } from "@/app";
import { pot } from "@/app/map";

export default function HomePagePots() {
  return (
    <div className="max-w-[528px] w-full bg-white roundedxl p-7 rounded-xl ">
      <div className="flex justify-between">
        <p className="font-bold text-xl ">Pots</p>
        <Link href="/pots">
          <p className="font-normal text-sm text-[#696868] hover:text-[#9e9d9d] tranisition ease-in-out duration-200">
            See Details
          </p>
        </Link>
      </div>
      <div className="flex justify-between gap-10">
        <div className="max-w-[167px] w-full bg-[#F8F4F0] rounded-xl flex px-2 py-3 my-5 ">
          <div>
            <Image
              src={dollarIcon}
              alt="dollarIcon"
              width={35}
              height={35}
              className="mt-3"
            />
          </div>
          <div className="mx-2">
            <p className="font-normal text-sm text-[#696868]">Total Saved</p>
            <p className="font-bold text-[32px] my-1">$850</p>
          </div>
        </div>
        <div className="grid grid-cols-2">
          {pot.map((el) => (
            <div key={el.id} className="max-w-[120px] w-full flex">
              <Image src={el.img} alt={el.title} width={4} height={73} />

              <div className="flex flex-col mx-4 mt-3">
                <p className="font-normal text-xs my-1 text-[#696868]">
                  {el.title}
                </p>
                <p className="font-bold text-sm my-1">{el.budget}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
