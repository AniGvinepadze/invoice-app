'use client';
import { budget } from '@/app/map';
import Image from 'next/image';
import Link from 'next/link';
import BudgetSection from '../../moleculs/BudgetSection/BudgetSection';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { IBudget } from '@/app/(dashboard)/budgets/page';
import { motion } from 'framer-motion';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://invoiceappback.onrender.com/';

const fetchBudgets = async (token: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/transactions`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (e) {
    console.error('Error fetching budgets:', e);
    return undefined;
  }
};

export default function HomePageBudget() {
  const [budgets, setBudgets] = useState<IBudget[]>();
  const [budgetsTotal, setBudgetsTotal] = useState<{ [key: string]: number }>({});
  const token = getCookie('accessToken') as string;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedBudgets = await fetchBudgets(token);
      if (fetchedBudgets) {
        setBudgets(fetchedBudgets);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (budgets) {
      const categoryTotals = budgets.reduce((acc, cur) => {
        const category = cur.category;
        acc[category] = (acc[category] || 0) + cur.amount;
        return acc;
      }, {} as { [key: string]: number });

      setBudgetsTotal(categoryTotals);
    }
  }, [budgets]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
      viewport={{ once: true }}
      className="max-w-[1000px  w-full bg-white rounded-xl mb-10 p-7 max-1050:mt-10"
    >
      <div className="flex justify-between">
        <h2 className="font-bold text-xl">Budget</h2>
        <Link href="/budgets">
          <p className="font-normal text-sm text-[#696868] hover:text-[#a3a2a2] transition ease-in-out duration-200">
            See Details
          </p>
        </Link>
      </div>

      <div className="flex justify-center mt-10">
        <div className="max-w-[400px] w-full mr-4 max-500:hidden">
          <BudgetSection chart={budgetsTotal} />
        </div>

        <div className="grid grid-cols-1 max-550:grid-cols-2 max-550:gap-6 max-550:text-center" >
          {budget.map((el) => (
            <div key={el.id} className="flex gap-7 my-2 ">
              <div className='max-w-[6px]'>
                <Image src={el.img} alt={el.title} width={24} height={24} />
              </div>
              <div>
                <p className="font-normal text-xs text-[#696868]">{el.title}</p>
                <p className="font-bold text-sm">{el.budget}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
