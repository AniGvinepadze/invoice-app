import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AddNewBill({
  handleClickShow,
}: {
  handleClickShow: any;
}) {
  return (
    <>
      <motion.button
        onClick={(e) => {
          handleClickShow(e);
        }}
        className="p-4 bg-gray-900 text-white font-bold rounded-[8px]"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{
          once: true,
        }}
      >
        + Add new Bill
      </motion.button>
    </>
  );
}
