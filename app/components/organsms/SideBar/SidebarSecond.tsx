"use client";
import React, { useState } from "react";

import { motion } from "framer-motion";

import TitleSection from "../../moleculs/SideBarSection/TitleSection";

import { sidebar } from "@/app/map";
import Option from "../../moleculs/SideBarSection/Option";
import ToggleClose from "../../moleculs/SideBarSection/ToggleClose";

export default function SidebarSecond() {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Overview");
  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 rounded-tr-xl rounded-br-xl bg-black p-5"
      style={{
        width: open ? "300px" : "fit-content",
      }}
    >
      <TitleSection open={ open} />

      <div className="space-y-1">
        {sidebar.map((el) => (
          <div key={el.id}>
            <Option
              Icon={el.img}
              title={el.title}
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
          </div>
        ))}
        <ToggleClose open={open} setOpen={setOpen} />
      </div>
    </motion.nav>
  );
}
