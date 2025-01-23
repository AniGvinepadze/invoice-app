"use client";

import { sidebar } from "@/app/map";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathName = usePathname();

  return (
    <div className="max-w-[300px] w-full h-screen rounded-tr-3xl rounded-br-3xl bg-[#201F24] text-[#B3B3B3]">
      <div className="p-7">
        <h2 className="font-extrabold text-[32px] text-white">finance</h2>
      </div>
      <div>
        {sidebar.map((el) => {
          const isActive = pathName === el.route; 
          return (
            <Link href={el.route} key={el.id}>
              <button
                className={`flex py-4 px-7 gap-6 transition-opacity  ease-in-out duration-500 max-w-[276px] w-full rounded-tr-xl rounded-br-xl ${
                  isActive ? "bg-white text-black" : "bg-transparent text-[#B3B3B3] opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={isActive ? el.activeImg : el.img} 
                  alt={el.title}
                  width={18}
                  height={18}
                  className="mt-[1.5px]"
                />
                <h3 className="font-bold text-base">{el.title}</h3>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
