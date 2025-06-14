"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Progress } from "@/components/ui/progress";
import DeleteEditModal from "./deleteEditModal";
import DeleteModal from "./deleteModal";
import { IPots } from "@/app/(dashboard)/pots/page";
import { getCookie } from "cookies-next";
import axios from "axios";
import { motion } from "framer-motion";
import EditModal from "./editModel";
import AddWithdrawModal from "./addMoneyWithdrawModel";

interface IProps {
  pot: IPots;
  handleSetPots: Dispatch<SetStateAction<IPots[]>>;
}

const colorMap = {
  "#277C78": "bg-green-700",
  "#626070": "bg-gray-600",
  "#82C9D7": "bg-blue-300",
  "#F2CDAC": "bg-orange-200",
  "#826CB0": "bg-purple-500",
} as const;

type ThemeColor = keyof typeof colorMap;

const PotsContent: React.FC<IProps> = ({ pot, handleSetPots }) => {
  const [viewerPot, setViewerPot] = useState<IPots>(pot);
  const [newTotal, setNewTotal] = useState<number>(pot.total);
  const [val, setValue] = useState<string | undefined>();
  const [deleteItem, setDelete] = useState(false);

  const token = getCookie("accessToken") as string;

  useEffect(() => {
    setViewerPot(pot);
    setNewTotal(pot.total);
  }, [pot]);

  const percentage =
    viewerPot.target === 0 ? 0 : (100 * (newTotal || 0)) / viewerPot.target;
  const percenteg = percentage.toFixed(2);

  const colorMap: Record<string, string> = {
    "#277C78": "bg-green-700",
    "#626070": "bg-gray-600",
    "#82C9D7": "bg-blue-300",
    "#F2CDAC": "bg-orange-200",
    "#826CB0": "bg-purple-500",
  };

  useEffect(() => {
    const updatePot = async () => {
      const newPot = { ...viewerPot, total: newTotal };

      try {
        await axios.patch(`https://invoiceappback.onrender.com/pots/${pot._id}`, newPot, {
          headers: { authorization: `Bearer ${token}` },
        });
        setViewerPot(newPot);
      } catch (err) {
        console.error("Failed to update pot:", err);
        setNewTotal(viewerPot.total);
      }
    };

    if (newTotal !== viewerPot.total) {
      updatePot();
    }
  }, [newTotal, pot._id, token, viewerPot]);

  useEffect(() => {
    const deletePot = async () => {
      try {
        await axios.delete(`https://invoiceappback.onrender.com/pots/${pot._id}`, {
          headers: { authorization: `Bearer ${token}` },
        });
        handleSetPots((prev) => prev?.filter((p) => p._id !== pot._id));
      } catch (err) {
        console.error("Failed to delete pot:", err);
      } finally {
        setDelete(false);
      }
    };

    if (deleteItem) deletePot();
  }, [deleteItem, pot._id, token, handleSetPots]);

  if (!viewerPot) return null;

  return (
    <>
      <motion.div
        className="xl:p-6 px-6 py-8 bg-white rounded-[12px]"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        viewport={{
          once: true,
        }}
      >
        <motion.div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                colorMap[viewerPot.theme as ThemeColor] || "bg-gray-500"
              }`}
            ></div>
            <h3 className="font-bold text-[#201f24] text-xl">
              {viewerPot.potName}
            </h3>
          </div>
          <DeleteEditModal handleValue={setValue} />
        </motion.div>
        <div>
          <div className="flex mt-[42px] justify-between">
            <span className="font-normal text-sm text-[#696868]">
              Total Saved
            </span>
            <span className="font-bold text-3xl text-[#201f24]">
              $ {newTotal}
            </span>
          </div>
          <div className="mt-4">
            <Progress
              value={Math.min(Number(percenteg), 100)}
              className={colorMap[viewerPot.theme as ThemeColor]}
            />
            <div className="flex justify-between mt-[13px]">
              <span className="font-bold text-[12px] leading-[18px] text-[#696868]">
                {percenteg} %
              </span>
              <span className="font-normal text-[12px] leading-[18px] text-[#696868]">
                Target of ${viewerPot.target}
              </span>
            </div>
          </div>
          <div className="mt-8 flex justify-between gap-4">
            <AddWithdrawModal
              title="+ Add Money"
              pot={viewerPot}
              handleNewTotal={
                setNewTotal as Dispatch<SetStateAction<number | undefined>>
              }
              newTotal={newTotal}
            />
            <AddWithdrawModal
              title="Withdraw"
              pot={viewerPot}
              handleNewTotal={
                setNewTotal as Dispatch<SetStateAction<number | undefined>>
              }
              newTotal={newTotal}
            />
          </div>
        </div>
      </motion.div>

      {val?.startsWith("Delete") && (
        <DeleteModal handleDelete={setDelete} handleValue={setValue} />
      )}
      {val?.startsWith("Edit") && (
        <EditModal
          handleValue={setValue}
          handleViewerPot={
            setViewerPot as Dispatch<SetStateAction<IPots | undefined>>
          }
          viewerPot={viewerPot}
        />
      )}
    </>
  );
};

export default PotsContent;
