import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AddNewBill({
  handleClickShow,
}: {
  handleClickShow: any;
}) {
  return (
    <>
      <button
        onClick={(e) => {
          handleClickShow(e);
        }}
        className="p-4 bg-gray-900 text-white font-bold rounded-[8px]"
      >
        + Add new Bill
      </button>
    </>
  );
}
