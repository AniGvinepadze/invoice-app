"use client";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function TitleSection({ open }: { open: boolean }) {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <h2 className="font-extrabold text-[36px]">finance</h2>
        </div>
  
        {open ? (
          <FiChevronUp className="mr-2 text-xl" />
        ) : (
          <FiChevronDown className="mr-2 text-xl" />
        )}
      </div>
    </div>
  );
}
