"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";

import PotsContent from "@/app/components/moleculs/pots/potsContent";
import { motion } from "framer-motion";
import PotsModal from "@/app/components/organsms/PotsModal/PotsModal";

export interface IPots {
  potName: string;
  target: number;
  theme: string;
  total: number;
  _id?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://invoiceappback.onrender.com";

const fetchPots = async (token: string): Promise<IPots[] | undefined> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/pots`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (e) {
    console.error("Error fetching pots:", e);
    return undefined;
  }
};

const getCurrentUser = async (token: string, router: any, setUser: any) => {
  if (!token) {
    router.push("/login");
    return;
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/current-user`, {
      headers: { authorization: `Bearer ${token}` },
    });
    setUser(response.data);
  } catch (err) {
    console.error("Error fetching current user:", err);
    router.push("/login");
  }
};

const createPot = async (
  newPot: IPots,
  token: string
): Promise<IPots | undefined> => {
  try {
    const res = await axios.post(`${API_BASE_URL}/pots`, newPot, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (e) {
    console.error("Error adding pot:", e);
    return undefined;
  }
};

function Pots() {
  const router = useRouter();
  const [pots, setPots] = useState<IPots[]>([]);
  const [newPot, setNewPot] = useState<IPots | undefined>();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = getCookie("accessToken") as string;

  useEffect(() => {
    getCurrentUser(token, router, setUser);
  }, [token, router]);

  useEffect(() => {
    if (!newPot) return;

    const addPot = async () => {
      const createdPot = await createPot(newPot, token);
      if (createdPot) {
        setPots((prev) => [createdPot, ...prev]);
      }
      setNewPot(undefined);
    };

    addPot();
  }, [newPot, token]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPots = await fetchPots(token);

      if (fetchedPots) {
        setPots(fetchedPots.reverse());
      }
      setIsLoading(false);
    };

    fetchData();
  }, [token]);

  if (!user) {
    return <div>Redirecting...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-10 pt-8 pb-[48px] w-full overflow-x-hidden overflow-y-auto h-screen">
      <div className="flex justify-between items-center">
        <motion.h1
          className="font-bold text-3xl"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Pots
        </motion.h1>

        <PotsModal handleNewPot={setNewPot} />
      </div>

      <motion.div
        className="grid mt-8 grid-cols-1 xl:grid-cols-2 gap-6 justify-between"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {pots.length > 0 ? (
          pots.map((pot) => (
            <PotsContent
              key={pot._id}
              pot={pot}
              handleSetPots={setPots as Dispatch<SetStateAction<IPots[]>>}
            />
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-500">
            No pots found. Create a new pot to get started!
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Pots;
