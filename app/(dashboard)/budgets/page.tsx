'use client';
import React, { useState, useEffect } from 'react';
import BudgetSection from '@/app/components/moleculs/BudgetSection/BudgetSection';;
import imageProf from '/assets/avatars/james-thompson.jpg';
import Image from 'next/image';

import { Progress } from '@/components/ui/progress';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import Link from 'next/link';

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

export interface IBudget {
  amount: number;
  category: string;
  date: string;
  sender: string;
  __v: number;
  _id: string;
  theme?: string; // Add optional properties
  maximum?: number;
}
function budgets() {
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
        console.log(fetchedPots, 'hereeeeeeeeeeeee');
      }
    };
    fetchData();
  }, []);
  console.log(groupedBudgets, 'budgetsaws');

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

      setGroupedBudgets(grouped);
      setBudgetsTotal(categoryTotals);
    }
  }, [budgets]);

  return (
    <main className=' max-w-[1440px] px-10  pt-8 pb-[48px] w-full overflow-x-hidden overflow-scroll h-screen w'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-3xl'>Budget</h1>
      </div>
      <div className='flex flex-col   sm:flex-col lg:flex-row gap-6 h-full'>
        <div className='flex  bg-white lg:self-start self-center  rounded-xl px-[20px] py-4 lg:p-8 flex-col  sm:flex-row lg:flex-col justify-between mt-10 max-1300:hidden'>
          <div className=' w-full mr-4'>
            <BudgetSection chart={budgetsTotal} />
          </div>
          <div className='flex flex-col justify-center'>
            {/* {budgets ? (
              budgets.map((el, i) => {
                return (
                  <div key={i} className='flex gap-7 my-2 '>
                    <div
                      className={`w-1 h-full`}
                      style={{ background: el.theme }}
                    ></div>
                    <div>
                      <p className='font-normal text-xs text-[#696868]'>
                        {el.category}
                      </p>
                      <p className='font-bold text-sm'>{el.maximum}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>no budget yet</p>
            )} */}
          </div>
        </div>
        <div className='flex flex-col gap-6 max-1300:w-full'>
          <div className=' max-w-[1000px] w-full flex flex-col'>
            {Object.entries(groupedBudgets).map(([category, transactions]) => (
              <div
                key={category}
                className='flex  max-w-[1000px] w-full bg-white rounded-xl px-[20px] py-4 lg:p-8 flex-col justify-between mt-10'
              >
                <div className='flex items-center gap-4'>
                  <div className='w-4 h-4 bg-green-500 rounded-full'></div>
                  <h4 className='font-bold text-xl'>{category}</h4>
                </div>

                <div className='flex mt-4'>
                  <div className='flex gap-4 flex-1'>
                    <div className='w-[2px] h-full bg-green-500'></div>
                    <div className='flex flex-col gap-1'>
                      <span className='font-[12px] leading-4 text-[#696868]'>
                        Total
                      </span>
                      <span className='font-bold text-[14px] leading-[21px] text-[#201f24]'>
                        $<span>{budgetsTotal[category]}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='mt-[20px] bg-[#f8f4f0] rounded-[12px] p-[20px]'>
                  <div className='flex justify-between mb-6'>
                    <p className='font-bold text-base text-[#201f24]'>
                      Latest Spending
                    </p>
                    <Link href="/transactions" className='text-[#696868] text-base'>See All</Link>
                  </div>
                  {(Array.isArray(transactions) ? transactions : []).map(
                    (transaction) => (
                      <div
                        key={transaction._id}
                        className='border-opacity-15 py-3 border-b border-b-[#696868]'
                      >
                        <div className='flex justify-between'>
                          <div className='flex gap-4 items-center justify-center'>
                            <div className='w-4 h-4 rounded-full overflow-hidden'>
                              <Image
                                src={imageProf}
                                alt='profile'
                                className='w-full h-full'
                              />
                            </div>
                            <p className='font-bold text-sm'>
                              {transaction.sender}
                            </p>
                          </div>
                          <div className='flex flex-col'>
                            <p className='text-[#201f24] self-end font-bold text-sm'>
                              ${transaction.amount}
                              {}
                            </p>
                            <p className='font-normal text-sm text-[#696868]'>
                              {transaction.date}
                            </p>
                          </div>
                        </div>
                        <div className='w-full bg-[#F2F2F2] h-[1px]' />
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* <div className='flex  bg-white rounded-xl px-[20px] py-4 lg:p-8 flex-col   justify-between mt-10'>
            <div className='flex items-center gap-4'>
              <div className='w-4 h-4 bg-green-500 rounded-full '></div>
              <h4 className='font-bold text-xl '>Entertainment</h4>
            </div>
            <span className='mt-[20px] font-[14px] leading-5 text-[#696868]'>
              Maximum of $<span>50.00</span>
            </span>
            <div className='mt-4 h-3'>
              <Progress value={40} className='bg-green-500 h-full' />
            </div>
            <div className='flex mt-4'>
              <div className='flex gap-4 flex-1'>
                <div className='w-[2px] h-full bg-green-500'></div>
                <div className='flex flex-col gap-1'>
                  <span className='font-[12px] leading-4 text-[#696868]'>
                    {' '}
                    Spent
                  </span>
                  <span className='font-bold text-[14px] leading-[21px] text-[#201f24]'>
                    $<span>20.00</span>
                  </span>
                </div>
              </div>
              <div className='flex gap-4 flex-1'>
                <div className='w-[2px] h-full bg-[#f8f4f0]'></div>
                <div className='flex flex-col gap-1'>
                  <span className='font-[12px] leading-4 text-[#696868]'>
                    {' '}
                    Remaining
                  </span>
                  <span className='font-bold text-[14px] leading-[21px] text-[#201f24]'>
                    $<span>35.00</span>
                  </span>
                </div>
              </div>
            </div>
            <div className='mt-[20px] bg-[#f8f4f0] rounded-[12px] p-[20px]'>
              <div className='flex justify-between mb-6'>
                <p className='font-bold text-base text-[#201f24]'>
                  Latest Spending
                </p>
                <div className='text-[#696868] text-base'>See All</div>
              </div>
              <div className='border-opacity-15 py-3 border-b border-b-[#696868]'>
                <div className='flex justify-between '>
                  <div className='flex gap-4 items-center justify-center'>
                    <div className='w-4 h-4 rounded-full overflow-hidden'>
                      <Image
                        src={imageProf}
                        alt='profile'
                        className='w-full h-full'
                      />
                    </div>
                    <p className='font-bold text-sm '>James Thompson</p>
                  </div>
                  <div className='flex flex-col '>
                    <p className='text-[#201f24] self-end font-bold text-sm '>
                      -$5.00
                    </p>
                    <p className='font-normal text-sm text-[#696868]'>
                      11 Aug 2024
                    </p>
                  </div>
                </div>
                <div className='w-full bg-[#F2F2F2] h-[1px] ' />
              </div>
              <div className='py-3 border-opacity-15 border-b border-b-[#696868]'>
                <div className='flex justify-between '>
                  <div className='flex gap-4 items-center justify-center'>
                    <div className='w-4 h-4 rounded-full overflow-hidden'>
                      <Image
                        src={imageProf}
                        alt='profile'
                        className='w-full h-full'
                      />
                    </div>
                    <p className='font-bold text-sm '>James Thompson</p>
                  </div>
                  <div className='flex flex-col '>
                    <p className='text-[#201f24] self-end font-bold text-sm '>
                      -$5.00
                    </p>
                    <p className='font-normal text-sm text-[#696868]'>
                      11 Aug 2024
                    </p>
                  </div>
                </div>
                <div className='w-full bg-[#F2F2F2] h-[1px] ' />
              </div>
              <div className='py-3 '>
                <div className='flex justify-between '>
                  <div className='flex gap-4 items-center justify-center'>
                    <div className='w-4 h-4 rounded-full overflow-hidden'>
                      <Image
                        src={imageProf}
                        alt='profile'
                        className='w-full h-full'
                      />
                    </div>
                    <p className='font-bold text-sm '>James Thompson</p>
                  </div>
                  <div className='flex flex-col '>
                    <p className='text-[#201f24] self-end font-bold text-sm '>
                      -$5.00
                    </p>
                    <p className='font-normal text-sm text-[#696868]'>
                      11 Aug 2024
                    </p>
                  </div>
                </div>
                <div className='w-full bg-[#F2F2F2] h-[1px] ' />
              </div>
            </div>
          </div>
          <div className='flex  bg-white rounded-xl px-[20px] py-4 lg:p-8 flex-col   justify-between mt-10'>
            <div className='flex items-center gap-4'>
              <div className='w-4 h-4 bg-green-500 rounded-full '></div>
              <h4 className='font-bold text-xl '>Entertainment</h4>
            </div>
            <span className='mt-[20px] font-[14px] leading-5 text-[#696868]'>
              Maximum of $<span>50.00</span>
            </span>
            <div className='mt-4 h-3'>
              <Progress value={40} className='bg-green-500 h-full' />
            </div>
            <div className='flex mt-4'>
              <div className='flex gap-4 flex-1'>
                <div className='w-[2px] h-full bg-green-500'></div>
                <div className='flex flex-col gap-1'>
                  <span className='font-[12px] leading-4 text-[#696868]'>
                    {' '}
                    Spent
                  </span>
                  <span className='font-bold text-[14px] leading-[21px] text-[#201f24]'>
                    $<span>20.00</span>
                  </span>
                </div>
              </div>
              <div className='flex gap-4 flex-1'>
                <div className='w-[2px] h-full bg-[#f8f4f0]'></div>
                <div className='flex flex-col gap-1'>
                  <span className='font-[12px] leading-4 text-[#696868]'>
                    {' '}
                    Remaining
                  </span>
                  <span className='font-bold text-[14px] leading-[21px] text-[#201f24]'>
                    $<span>35.00</span>
                  </span>
                </div>
              </div>
            </div>
            <div className='mt-[20px] bg-[#f8f4f0] rounded-[12px] p-[20px]'>
              <div className='flex justify-between mb-6'>
                <p className='font-bold text-base text-[#201f24]'>
                  Latest Spending
                </p>
                <div className='text-[#696868] text-base'>See All</div>
              </div>
              <div className='border-opacity-15 py-3 border-b border-b-[#696868]'>
                <div className='flex justify-between '>
                  <div className='flex gap-4 items-center justify-center'>
                    <div className='w-4 h-4 rounded-full overflow-hidden'>
                      <Image
                        src={imageProf}
                        alt='profile'
                        className='w-full h-full'
                      />
                    </div>
                    <p className='font-bold text-sm '>James Thompson</p>
                  </div>
                  <div className='flex flex-col '>
                    <p className='text-[#201f24] self-end font-bold text-sm '>
                      -$5.00
                    </p>
                    <p className='font-normal text-sm text-[#696868]'>
                      11 Aug 2024
                    </p>
                  </div>
                </div>
                <div className='w-full bg-[#F2F2F2] h-[1px] ' />
              </div>
              <div className='py-3 border-opacity-15 border-b border-b-[#696868]'>
                <div className='flex justify-between '>
                  <div className='flex gap-4 items-center justify-center'>
                    <div className='w-4 h-4 rounded-full overflow-hidden'>
                      <Image
                        src={imageProf}
                        alt='profile'
                        className='w-full h-full'
                      />
                    </div>
                    <p className='font-bold text-sm '>James Thompson</p>
                  </div>
                  <div className='flex flex-col '>
                    <p className='text-[#201f24] self-end font-bold text-sm '>
                      -$5.00
                    </p>
                    <p className='font-normal text-sm text-[#696868]'>
                      11 Aug 2024
                    </p>
                  </div>
                </div>
                <div className='w-full bg-[#F2F2F2] h-[1px] ' />
              </div>
              <div className='py-3 '>
                <div className='flex justify-between '>
                  <div className='flex gap-4 items-center justify-center'>
                    <div className='w-4 h-4 rounded-full overflow-hidden'>
                      <Image
                        src={imageProf}
                        alt='profile'
                        className='w-full h-full'
                      />
                    </div>
                    <p className='font-bold text-sm '>James Thompson</p>
                  </div>
                  <div className='flex flex-col '>
                    <p className='text-[#201f24] self-end font-bold text-sm '>
                      -$5.00
                    </p>
                    <p className='font-normal text-sm text-[#696868]'>
                      11 Aug 2024
                    </p>
                  </div>
                </div>
                <div className='w-full bg-[#F2F2F2] h-[1px] ' />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
}

export default budgets;
