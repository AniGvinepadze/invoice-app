'use client';


import { minimizeBtn } from "@/app";
import { sidebar } from "@/app/map";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";



export default function SideBar() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (

    <div>
      <div
        className={`h-full bg-[#201F24] text-[#B3B3B3] rounded-tr-3xl rounded-br-3xl transition-all duration-700 ease-in-out max-1050:hidden ${
          isOpen ? "w-[300px]" : "w-[74px]"
        }`}
      >
        <div className="p-7">
          <h2
            className={`font-extrabold text-[32px] text-white transition-opacity duration-500 ease-in-out ${
              isOpen ? "" : ""
            } whitespace-nowrap overflow-hidden`}
            style={{ width: isOpen ? "auto" : "" }}
          >
            {isOpen ? "finance" : "f"}
          </h2>
        </div>
     
          <div>
            {sidebar.map((el) => {
              const isActive = pathName === el.route;
              return (
                <Link href={el.route} key={el.id}>
                  <button
                    className={`flex items-center py-4 px-7 gap-6 transition-all ease-in-out duration-500 max-w-[276px] w-full rounded-tr-xl rounded-br-xl ${
                      isActive
                        ? "bg-white text-black"
                        : "bg-transparent text-[#B3B3B3] opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={isActive ? el.activeImg : el.img}
                      alt={el.title}
                      width={18}
                      height={18}
                      className="mt-[1.5px]"
                    />
                    <span
                      className={`font-bold text-base transition-opacity duration-500 ease-in-out ${
                        isOpen ? "opacity-100" : "opacity-0"
                      } whitespace-nowrap overflow-hidden`}
                      style={{ width: isOpen ? "auto" : "0px" }}
                    >
                      {el.title}
                    </span>
                  </button>
                </Link>
              );
            })}
          </div>

          <div className="mt-10">
            <button
              onClick={handleIsOpen}
              className=" text-white py-2 px-4 rounded transition-transform duration-300 hover:scale-105 flex mx-2 "
            >
              <Image
                src={minimizeBtn}
                alt="minimizeBtn"
                width={24}
                height={24}
                className={`transition-transform ease-in-out duration-1000 ${
                  isOpen ? "" : "rotate-180"}`}
              />
              <p
                className={`font-bold text-[#848484] text-base transition-opacity duration-500 mx-4 ease-in-out ${
                  isOpen ? "opacity-100" : "opacity-0"
                } whitespace-nowrap overflow-hidden`}
                style={{ width: isOpen ? "auto" : "0px" }}
              >

                {isOpen ? "Minimize Menu" : ""}
              </p>
            </button>
          </div>
        </div>
   

    </div>
  );
}
