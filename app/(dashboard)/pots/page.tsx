'use client';
import BudgetModal from '@/app/components/organsms/BudgetModal/BudgetModal';
import React, { useEffect, useState } from 'react';
import PotsContent from '@/app/components/moleculs/pots/potsContent';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export interface IPots {
  potName: string;
  target: number;
  theme: string;
  total: number;
  _id?: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

const fetchPots = async (token: string): Promise<IPots[] | undefined> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/pots`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (e) {
    console.error('Error fetching pots:', e);
  }
};

const getCurrentUser = async (token: string, router: any, setUser: any) => {
  if (!token) {
    router.push('/login');
    return;
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/current-user`, {
      headers: { authorization: `Bearer ${token}` },
    });
    setUser(response.data);
  } catch (err) {
    router.push('/login');
  }
};

function Pots() {
  const router = useRouter();
  const [pots, setPots] = useState<IPots[] | undefined>([]);
  const [newPot, setNewPot] = useState<IPots | undefined>();
  const [user, setUser] = useState();

  const token = getCookie('accessToken') as string;

  useEffect(() => {
    getCurrentUser(token, router, setUser);
  }, [token]);

  useEffect(() => {
    if (!newPot) return;

    const createPot = async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}/pots`, newPot, {
          headers: { authorization: `Bearer ${token}` },
        });

        setPots((prev) => [newPot, ...prev]);
        
        setNewPot(undefined);
     

      } catch (e) {
        console.error('Error adding pot:', e);
      }
    };

    createPot();
  }, [newPot]);
  

  useEffect(() => {
    const potsFetch = async () => {
      const res = await fetchPots(token);
      if (res) setPots(res.reverse());
    };

    potsFetch();
  }, [token]);

  if (!user) return null;

  return (
    <div className='px-10 pt-8 pb-[48px] w-full overflow-x-hidden overflow-scroll h-screen'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-3xl'>Pots</h1>
        <BudgetModal handleNewPot={setNewPot} />
      </div>
      <div className='grid mt-8 grid-cols-1 xl:grid-cols-2 gap-6 justify-between'>
        {pots?.map((p, i) => (
          <PotsContent key={p._id} index={i} pot={p} handleSetPots={setPots} />
        ))}
      </div>
    </div>
  );
}

export default Pots;
