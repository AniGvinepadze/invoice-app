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
      setIsOpen(true); // Slide-in effect after the component mounts
    }, 100); // Delay to allow animation to play

    return () => clearTimeout(timer);
  }, []);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div
        className={`fixed bottom-0 left-0 w-full bg-[#201F24] max-h-[74px] hidden text-[#B3B3B3] p-1
          rounded-tr-3xl rounded-tl-3xl transition-transform duration-700 ease-in-out max-1050:flex ${
            isOpen ? "translate-y-0" : "translate-y-[100%]" // 
          }`}
      >
        <div className="flex justify-evenly w-full">
          {sidebar.map((el) => {
            const isActive = pathName === el.route;
            return (
              <Link href={el.route} key={el.id}>
                <button
                  className={`flex flex-col rounded-tr-xl rounded-tl-xl items-center py-4 px-7 gap-1 transition-all ease-in-out duration-500 
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
                    className="mt-[1.5px]"
                  />
                  <span className="font-bold text-xs transition-opacity duration-500 ease-in-out whitespace-nowrap overflow-hidden">
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
