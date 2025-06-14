"use client";

import { minimizeBtn } from "@/app";
import { sidebar } from "@/app/map";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function MobileSideBar() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div
        className={`fixed bottom-0 max-w-[1440px]  left-0 w-full bg-[#201F24] max-h-[74px] hidden text-[#B3B3B3] p-2
          rounded-tr-3xl rounded-tl-3xl transition-transform duration-700 ease-in-out max-1050:flex ${
            isOpen ? "translate-y-0" : "translate-y-[100%]" 
          }`}
      >
        <div className="flex justify-evenly w-full max-w-[1440px]">
          {sidebar.map((el) => {
            const isActive = pathName === el.route;
            return (
              <Link href={el.route} key={el.id} className=" max-w-[150px] w-full">
                <button
                  className={`flex flex-col w-full rounded-tr-xl rounded-tl-xl items-center py-4  gap-1 transition-all ease-in-out duration-500 
                    ${isActive
                      ? "bg-white text-black"
                      : "bg-transparent text-[#B3B3B3] opacity-50 hover:opacity-100"
                    }`}
                >
                  <Image
                    src={isActive ? el.activeImg : el.img}
                    alt={el.title}
                    width={18}
                    height={18}
                    className="mt-[1.5px] object-contain"
                  />
                  <span className="font-bold text-xs transition-opacity duration-500 ease-in-out whitespace-nowrap overflow-hidden max-450:hidden">
                    {el.title}
                  </span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
