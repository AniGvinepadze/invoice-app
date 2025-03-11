'use client';
import { Progress } from '@/components/ui/progress';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import closeSvg from '@/public/assets/close.svg';
import Image from 'next/image';

interface IPot {
  potName: string;
  target: number;
  total: number;
  theme: string;
}

interface AddWithdrawModalProps {
  title: string;
  pot: IPot;
  handleNewTotal: React.Dispatch<React.SetStateAction<number | undefined>>;
  newTotal: number | undefined;
}

const AddWithdrawModal: React.FC<AddWithdrawModalProps> = ({
  title,
  pot,
  handleNewTotal,
  newTotal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputAmount, setInputAmount] = useState<number | null>(null);

  const currentTotal = newTotal ?? pot.total;
  const percentage = Math.min(100, (currentTotal / pot.target) * 100 || 0);

  const newAmount = title.startsWith('Withdraw')
    ? currentTotal - (inputAmount ?? 0)
    : currentTotal + (inputAmount ?? 0);
  const newPercentage = Math.min(100, (newAmount / pot.target) * 100 || 0);

  const colorMap: Record<string, string> = {
    '#277C78': 'bg-green-700',
    '#626070': 'bg-gray-600',
    '#82C9D7': 'bg-blue-300',
    '#F2CDAC': 'bg-orange-200',
    '#826CB0': 'bg-purple-500',
  };

  const handleSubmit = () => {
    if (!inputAmount || inputAmount <= 0) {
      alert('Invalid amount');
      return;
    }

    if (title.startsWith('Withdraw')) {
      if (inputAmount > currentTotal) {
        alert('Withdrawal amount exceeds total saved');
        return;
      }
      handleNewTotal((prev) => (prev ?? pot.total) - inputAmount);
    } else {
      handleNewTotal((prev) => (prev ?? pot.total) + inputAmount);
    }

    setInputAmount(null);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className='bg-[#f8f4f0] w-full hover:bg-white text-[12px] md:text-[14px] font-bold text-[#201f24] py-[16px] rounded-lg border border-[#f8f4f0] hover:border-[#98908b] transition-colors'
        type='button'
        onClick={() => setIsOpen(true)}
      >
        {title}
      </button>

      {isOpen && (
        <div
          className='fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50'
          onClick={() => setIsOpen(false)}
        >
          <div
            className='bg-white max-w-[560px] w-full p-8 rounded-lg shadow-lg'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between'>
              <h3 className=' font-bold text-3xl mb-[20px] text-[#201f24]'>
                {title} '{pot.potName}'
              </h3>

              <div className='flex justify-between cursor-pointer'>
                <span
                  className='cursor-pointer '
                  onClick={() => setIsOpen(false)}
                >
                  <Image src={closeSvg} alt='close button' />
                </span>
              </div>
            </div>

            <div className='mt-6'>
              <div className='flex justify-between'>
                <span className='text-sm text-[#696868]'>New Amount</span>
                <span className='text-3xl font-bold text-[#201f24]'>
                  $ {currentTotal}
                </span>
              </div>

              <div className='mt-4 relative h-2 w-full bg-[#f8f4f0] rounded-full overflow-hidden'>
                <div
                  className={cn(
                    'absolute h-full transition-all',
                    title.startsWith('Withdraw')
                      ? 'bg-[#c94736]'
                      : 'bg-[#277c78]'
                  )}
                  style={{ width: `${percentage}%` }}
                />
                <div
                  className={cn(
                    'absolute h-full transition-all',
                    colorMap[pot.theme] || 'bg-gray-500'
                  )}
                  style={{ width: `${newPercentage}%` }}
                />
              </div>

              <div className='flex justify-between mt-3'>
                <span
                  className={`text-sm font-bold ${
                    newPercentage !== percentage
                      ? 'text-[#277c78]'
                      : 'text-[#696868]'
                  }`}
                >
                  {newPercentage.toFixed(2)}%
                </span>
                <span className='text-sm text-[#696868]'>
                  Target: ${pot.target}
                </span>
              </div>
            </div>

            <div className='mt-6'>
              <span className='font-bold text-sm'>
                {title.startsWith('Withdraw')
                  ? 'Amount to Withdraw'
                  : 'Amount to Add'}
              </span>
              <label className='border rounded-lg flex py-3 px-4 border-[#98908b] mt-1'>
                <span className='mr-2'>$</span>
                <input
                  type='number'
                  className='w-full bg-transparent outline-none'
                  value={inputAmount ?? ''}
                  onChange={(e) =>
                    setInputAmount(Number(e.target.value) || null)
                  }
                  min={0}
                  max={title.startsWith('Withdraw') ? currentTotal : pot.target}
                />
              </label>
            </div>

            <button
              type='button'
              className='mt-4 bg-[#201f24] w-full text-white p-2 rounded'
              onClick={handleSubmit}
            >
              {title.startsWith('Withdraw')
                ? 'Confirm Withdrawal'
                : 'Confirm Addition'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddWithdrawModal;
