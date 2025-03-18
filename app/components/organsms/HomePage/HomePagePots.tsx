import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dollarIcon } from "@/app";
import { pot } from "@/app/map";
import {motion} from "framer-motion"
export default function HomePagePots() {
  return (
    <motion.div
      className="max-w-[1000px] w-full bg-white p-7 rounded-xl "
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
      viewport={{
        once: true,
      }}
    >
      <div className="flex justify-between">
        <p className="font-bold text-xl ">Pots</p>
        <Link href="/pots">
          <p className="font-normal text-sm text-[#696868] hover:text-[#9e9d9d] tranisition ease-in-out duration-200">
            See Details
          </p>
        </Link>
      </div>
      <div className="flex justify-between   max-600:flex-col">
        <div className="max-w-[417px] w-full bg-[#F8F4F0] rounded-xl flex px-2 py-3 my-5 ">
          <div>
            <Image
              src={dollarIcon}
              alt="dollarIcon"
              width={35}
              height={35}
              className="mt-4"
            />
          </div>
          <div className="mx-2">
            <p className="font-normal text-sm text-[#696868]">Total Saved</p>
            <p className="font-bold text-[32px] my-1">$850</p>
          </div>
        </div>
        <div className="grid grid-cols-2 max-w-[400px] w-full ">
          {pot.map((el) => (
            <div key={el.id} className="max-w-[130px] w-full flex px-5 ">
              <Image src={el.img} alt={el.title} width={4} height={73} />

              <div className="flex flex-col  mt-1 px-3 max-1050:px-5 ">
                <p className="font-normal text-xs my-1 text-[#696868]">
                  {el.title}
                </p>
                <p className="font-bold text-sm my-1">{el.budget}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
