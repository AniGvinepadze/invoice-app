'use client';
import BudgetModal from '@/app/components/organsms/BudgetModal/BudgetModal';
import React, { useEffect, useState } from 'react';
import data from '@/data.json';
import PotsContent from '@/app/components/moleculs/pots/potsContent';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export interface IPots {
  potName: string;
  target: number;
  theme: string;
  total: number;
  _id: string;
}

const fetchPots = async (token: string): Promise<IPots[] | undefined> => {
  let url = `http://localhost:3001/pots`;
  try {
    const res = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
function Pots() {
  const router = useRouter();
  const [pots, setPots] = useState<IPots[] | undefined>();

  const [newPot, setNewPot] = useState<IPots | undefined>();

  const [user, setUser] = useState();

  const token = getCookie('accessToken') as string;
  useEffect(() => {
    const getCurrentUser = async () => {
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get(
          'http://localhost:3001/auth/current-user',
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (err) {
        router.push('/login');
      }
    };

    getCurrentUser();
  }, [token]);

  useEffect(() => {
    const potsFetch = async () => {
      const res = await fetchPots(token);
      setPots(res?.reverse());
    };
    potsFetch();
  }, [token]);

  useEffect(() => {
    if (!newPot) return;

    const create = async () => {
      try {
        const res = await axios.post('http://localhost:3001/pots', newPot, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setPots((prev) => [res.data, ...prev]);
      } catch (e) {
        console.error('Error adding pot:', e);
      }
    };

    create();
    router.refresh();
  }, [newPot]);

  if (!user) return null;

  return (
    <div className='px-10  pt-8 pb-[48px] w-full overflow-x-hidden overflow-scroll h-screen'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-3xl'>Pots</h1>
        <BudgetModal handleNewPot={setNewPot} />
      </div>
      <div className='grid mt-8  grid-cols-1 xl:grid-cols-2 gap-6 justify-between'>
        {pots &&
          pots.map((p, i) => {
            return (
              <PotsContent key={i} index={i} pot={p} handleSetPots={setPots} />
            );
          })}
      </div>
    </div>
  );
}

export default Pots;
