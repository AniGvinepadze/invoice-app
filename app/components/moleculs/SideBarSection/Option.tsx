"use client"
import {  motion } from "framer-motion";
import React from "react";
import { IconType } from "react-icons";

export default function Option({
  Icon,
  title,
  selected,
  setSelected,
  open,
}: {
  Icon: IconType;
  title: string;
  selected: string;
  setSelected:  React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
}) {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-white text-black"
          : "text-slate-500 hover:bg-slate-500"
      }`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>

     {open && (
        <motion.span
        layout
        initial={{opacity:0,y:12}}
        animate={{opacity:1,y:0}}
        transition={{ delay: 0.125, duration: 0.3 }}
        className="text-xs font-medium"
        >
            {title}
        </motion.span>
     )}

   
    </motion.button>
  );
}
