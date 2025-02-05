'use client';
import { Progress } from '@/components/ui/progress';
import React, { useEffect, useState } from 'react';
import data from '@/data.json';
import { cn } from '@/lib/utils';

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

  const percentage = Number(
    (100 * (newTotal ? newTotal : pot.total)) / pot.target
  ).toFixed(2);
  const newAmount: number = title.startsWith('Withdraw')
    ? +(newTotal ?? pot.total) - (inputAmount ?? 0)
    : +(newTotal ?? pot.total) + (inputAmount ?? 0);

  const [newPercentage, setNewPercentage] = useState<number | null | undefined>(
    null
  );

  useEffect(() => {
    setNewPercentage(Number((100 * newAmount) / pot.target));
  }, [newAmount]);

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
      setInputAmount(null);
      return;
    }

    if (title.startsWith('Withdraw')) {
      if (inputAmount > (newTotal ?? pot.total)) {
        alert('Withdrawal amount exceeds total saved');
        setInputAmount(null);
        return;
      }
      handleNewTotal((prev) => (prev ?? pot.total) - inputAmount);
    } else {
      if ((newTotal ?? pot.total) + inputAmount > pot.target) {
        alert('Cannot exceed the target amount');
        setInputAmount(null);
        return;
      }
      handleNewTotal((prev) => (prev ?? pot.total) + inputAmount);
    }

    setInputAmount(null);
    setNewPercentage(null);
  };

  const value = +percentage > 100 ? 100 : +percentage;
  const newPercentageValue = newPercentage
    ? +newPercentage.toFixed(2) > 100
      ? 100
      : newPercentage
    : null;

  return (
    <>
      <button
        className='bg-[#f8f4f0] w-full hover:bg-white text-[12px] md:text-[14px] md:leading-5 font-bold text-[#201f24] flex justify-center py-[16px] rounded-lg cursor-pointer border border-[#f8f4f0] hover:border-[#98908b] transition-colors ease-in-out duration-500 xl:leading-[27px]'
        type='button'
        onClick={() => setIsOpen(true)}
      >
        {title}
      </button>
      {isOpen && (
        <div
          className={cn(
            'fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300',
            { 'opacity-100': isOpen, 'opacity-0 pointer-events-none': !isOpen }
          )}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={cn(
              'bg-white max-w-[560px] w-full p-8 rounded-lg shadow-lg transition-transform duration-300 transform',
              { 'scale-100 opacity-100': isOpen, 'scale-95 opacity-0': !isOpen }
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between'>
              <h3>Add to '{pot.potName}'</h3>
              <span>X</span>
            </div>
            <p>
              Add money to your pot to keep it separate from your main balance.
              As soon as you add this money, it will be deducted from your
              current balance.
            </p>
            <div>
              <div className='flex mt-[42px] justify-between'>
                <span className='font-normal text-sm text-[#696868]'>
                  Total Saved
                </span>
                <span className='font-bold text-3xl text-[#201f24]'>
                  $ {newTotal}
                </span>
              </div>
              <div className='mt-4'>
                <div
                  className={cn(
                    'relative h-2 w-full overflow-hidden rounded-full bg-[#f8f4f0]'
                  )}
                >
                  <div
                    className={cn(
                      `h-full w-full flex-1 absolute top-0 bg-primary transition-all z-30 ${
                        colorMap[pot.theme]
                      }`
                    )}
                    style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
                  ></div>
                  {title.startsWith('Withdraw') ? (
                    <div
                      className={cn(
                        `h-full w-full absolute z-40  top-0  bg-[#c94736] transition-all `
                      )}
                      style={{
                        transform: `translateX(-${
                          100 - (newPercentageValue ? +newPercentageValue : 0)
                        }%)`,
                      }}
                    ></div>
                  ) : (
                    <div
                      className={cn(
                        `h-full w-full absolute z-20  top-0  bg-[#277c78] transition-all `
                      )}
                      style={{
                        transform: `translateX(-${
                          100 - (newPercentageValue ? +newPercentageValue : 0)
                        }%)`,
                      }}
                    ></div>
                  )}
                </div>
                {title.startsWith('Withdraw') ? (
                  <div className='flex justify-between mt-[13px]'>
                    <span
                      className={`font-bold text-[12px] leading-[18px] text-[#696868] ${
                        Number(newPercentage)
                          ? 'text-[#c94736]'
                          : 'text-[#696868]'
                      }`}
                    >
                      {Number(newPercentage)
                        ? Number(newPercentage).toFixed(2)
                        : +percentage}{' '}
                      %
                    </span>

                    <span className='font-normal text-[12px] leading-[18px] text-[#696868]'>
                      Target of ${pot.target}
                    </span>
                  </div>
                ) : (
                  <div className='flex justify-between mt-[13px]'>
                    <span
                      className={`font-bold text-[12px] leading-[18px] text-[#696868] ${
                        Number(newPercentage)
                          ? 'text-[#277c78]'
                          : 'text-[#696868]'
                      }`}
                    >
                      {Number(newPercentage)
                        ? Number(newPercentage).toFixed(2)
                        : +percentage}{' '}
                      %
                    </span>

                    <span className='font-normal text-[12px] leading-[18px] text-[#696868]'>
                      Target of ${pot.target}
                    </span>
                  </div>
                )}
              </div>
              <div className='mt-[20px] gap-1 flex flex-col'>
                <span className='font-bold text-[12px] leading-6'>
                  {title.startsWith('Withdraw')
                    ? 'Amount to Withdraw'
                    : 'Amount to Add'}
                </span>
                <label className='border rounded-[8px]  focus:border-0 flex py-3  px-[20px] border-[#98908b] justify-center gap-4'>
                  <span>$</span>

                  <input
                    type='number'
                    className='w-full'
                    placeholder=''
                    value={inputAmount ? inputAmount : ''}
                    onChange={(e) => setInputAmount(Number(e.target.value))}
                    min={0}
                    max={
                      title.startsWith('Withdraw') ? +pot.total : +pot.target
                    }
                  />
                </label>
              </div>
            </div>
            <button
              type='button'
              className='mt-4 bg-[#201f24] w-full text-white p-2 rounded'
              onClick={() => {
                setIsOpen(false);
                handleSubmit();
              }}
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
