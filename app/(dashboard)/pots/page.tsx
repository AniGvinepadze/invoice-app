'use client';
import BudgetModal from '@/app/components/organsms/BudgetModal/BudgetModal';
import React, { useEffect, useState } from 'react';
import data from '@/data.json';
import PotsContent from '@/app/components/moleculs/pots/potsContent';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IPots {
  title: string;
  content: string;
}

const fetchPots = async (token: string): Promise<IPots[]> => {
  let url = `http://localhost:3001/pots`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch data, response is not OK');

  const data = await res.json();

  return data;
};
function Pots() {
  const router = useRouter();
  const [pots, setPots] = useState(data.pots || []);

  const [user, setUser] = useState();

  const getCurrentUser = async (token: string) => {
    try {
      const response = await axios.get(
        'http://localhost:3001/auth/current-user',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (err) {
      router.push('/login');
    }
  };

  const token = getCookie('accessToken');
  useEffect(() => {
    getCurrentUser(token as string);
  }, []);

  useEffect(() => {
    const potsFetch = async () => {
      const res = await fetchPots(token as string);
      console.log(res, 'pots');
    };
    potsFetch();
  }, [pots]);

  if (!user) return null;

  return (
    <div className='px-10  pt-8 pb-[48px] w-full overflow-x-hidden overflow-scroll h-screen'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-3xl'>Pots</h1>
        <BudgetModal handleSetPots={setPots} />
      </div>
      <div className='grid mt-8  grid-cols-1 xl:grid-cols-2 gap-6 justify-between'>
        {pots.map((p, i) => {
          return (
            <PotsContent key={i} index={i} pot={p} handleSetPots={setPots} />
          );
        })}
      </div>
    </div>
  );
}

export default Pots;
