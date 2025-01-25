'use client';
import React, { useState } from 'react';
import iconElipsed from '@/public/assets/icon-ellipsis.svg';
import Image from 'next/image';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import AddWithdrawModal from './addMoneyWithdrawModel';

interface IPot {
  name: string;
  target: number;
  total: number;
  theme: string;
}

const PotsContent: React.FC<{ pot: IPot }> = ({ pot }) => {
  const [newTotal, setNewTotal] = useState<number>(pot.total);
  const percenteg = Number((100 * newTotal) / pot.target).toFixed(2);
  console.log(percenteg);
  const colorMap: Record<string, string> = {
    '#277C78': 'bg-green-700',
    '#626070': 'bg-gray-600',
    '#82C9D7': 'bg-blue-300',
    '#F2CDAC': 'bg-orange-200',
    '#826CB0': 'bg-purple-500',
  };

  return (
    <div className='p-6 bg-white rounded-[12px]'>
      <div className='flex justify-between'>
        <div className='flex gap-4 items-center'>
          <div className={`w-4 h-4  rounded-full ${colorMap[pot.theme]}`}></div>
          <h3 className='font-bold  text-[#201f24] text-xl '> Savings</h3>
        </div>
        <Image src={iconElipsed} alt='setting' />
      </div>
      <div>
        <div className='flex mt-[42px] justify-between'>
          <span className='font-normal text-sm text-[#696868] '>
            Total Saved
          </span>
          <span className='font-bold text-3xl text-[#201f24]'>
            $ {pot.total}
          </span>
        </div>
        <div className='mt-4'>
          <Progress
            value={+percenteg > 100 ? 100 : +percenteg}
            className={`${colorMap[pot.theme]}`}
          />
          <div className='flex justify-between mt-[13px]'>
            <span className='font-bold text-[12px] leading-[18px] text-[#696868]'>
              {+percenteg} %
            </span>

            <span className='font-normal text-[12px] leading-[18px] text-[#696868]'>
              Target of ${pot.target}
            </span>
          </div>
        </div>
        <div className='mt-8 flex justify-between gap-4 '>
          <AddWithdrawModal
            title='+ Add Money'
            pot={pot}
            handleNewTotal={setNewTotal}
            newTotal={newTotal}
          />
          <AddWithdrawModal
            title='Withdraw'
            pot={pot}
            handleNewTotal={setNewTotal}
            newTotal={newTotal}
          />
        </div>
      </div>
    </div>
  );
};

export default PotsContent;
