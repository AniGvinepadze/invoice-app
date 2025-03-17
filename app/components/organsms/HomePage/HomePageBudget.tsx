'use client';
import { budget } from '@/app/map';
import Image from 'next/image';
import Link from 'next/link';
import BudgetSection from '../../moleculs/BudgetSection/BudgetSection';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { IBudget } from '@/app/(dashboard)/budgets/page';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

const fetchPots = async (token: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/transactions`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (e) {
    console.error('Error fetching pots:', e);
    return undefined;
  }
};
export default function HomePageBudget() {
  const [budgets, setBudgets] = useState<IBudget[]>();
  const [groupedBudgets, setGroupedBudgets] = useState<{
    [key: string]: IBudget[];
  }>({});
  const [budgetsTotal, setBudgetsTotal] = useState<{
    [key: string]: number;
  }>({});

  const token = getCookie('accessToken') as string;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPots = await fetchPots(token);
      if (fetchedPots) {
        setBudgets(fetchedPots);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (budgets) {
      const grouped = budgets.reduce((acc, cur) => {
        const category = cur.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(cur);
        return acc;
      }, {} as { [key: string]: IBudget[] });
      const categoryTotals = Object.entries(grouped).reduce(
        (acc, [category, transactions]) => {
          const totalAmount = transactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
          );
          acc[category] = totalAmount;
          return acc;
        },
        {} as { [key: string]: number }
      );

      setBudgetsTotal(categoryTotals);
    }
  }, [budgets]);

  return (
    <div className='max-w-[1000px] w-full bg-white rounded-xl mb-10 p-7'>
      <div className='flex justify-between'>
        <h2 className='font-bold text-xl '>Budget</h2>
        <div>
          <Link href='/reccuringBills '>
            <p className='font-normal text-sm text-[#696868] hover:text-[#a3a2a2] transition ease-in-out duration-200'>
              See Details
            </p>
          </Link>
        </div>
      </div>

      <div className='flex justify-center mt-10'>
        <div className='max-w-[400px] w-full mr-4'>
          <BudgetSection chart={budgetsTotal} />
        </div>
      </div>
    </div>
  );
}
