'use client';
import React, { useEffect, useState } from 'react';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import AddWithdrawModal from './addMoneyWithdrawModel';
import DeleteEditModal from './deleteEditModal';
import DeleteModal from './deleteModal';

interface IPot {
  name: string;
  target: number;
  total: number;
  theme: string;
}
interface IProps {
  pot: IPot;
  handleSetPots: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        target: number;
        total: number;
        theme: string;
      }[]
    >
  >;
  index: number;
}

const PotsContent: React.FC<IProps> = ({ pot, handleSetPots, index }) => {
  const [newTotal, setNewTotal] = useState<number | undefined>();
  const [val, setValue] = useState<string | undefined>();
  const [deleteItem, setDelete] = useState(false);
  console.log(val);
  useEffect(() => {
    const total = pot.total;
    setNewTotal(total);
    console.log(newTotal);
  });

  const percenteg = Number(
    (100 * (newTotal ? newTotal : pot.total)) / pot.target
  ).toFixed(2);
  const colorMap: Record<string, string> = {
    '#277C78': 'bg-green-700',
    '#626070': 'bg-gray-600',
    '#82C9D7': 'bg-blue-300',
    '#F2CDAC': 'bg-orange-200',
    '#826CB0': 'bg-purple-500',
  };

  useEffect(() => {
    console.log(percenteg);
    if (deleteItem) {
      console.log(val, 'val2');
      if (val?.startsWith('Delete')) {
        handleSetPots((prev) => {
          setValue('');
          return prev.filter((_, i) => i !== index);
        });
      }
    }
  }, [deleteItem, val]);

  return (
    <>
      <div className='xl:p-6 px-6 py-8 bg-white rounded-[12px]'>
        <div className='flex justify-between'>
          <div className='flex gap-4 items-center'>
            <div
              className={`w-4 h-4  rounded-full ${colorMap[pot.theme]}`}
            ></div>
            <h3 className='font-bold  text-[#201f24] text-xl '> {pot.name}</h3>
          </div>
          <DeleteEditModal
            handleValue={setValue}
            handleSetPots={handleSetPots}
          />
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
      {val && val.startsWith('Delete') && (
        <DeleteModal handleDelete={setDelete} handleValue={setValue} />
      )}
    </>
  );
};

export default PotsContent;
