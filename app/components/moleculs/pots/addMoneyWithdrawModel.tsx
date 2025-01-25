'use client';
import { Progress } from '@/components/ui/progress';
import React, { useEffect, useState } from 'react';
import data from '@/data.json';
import { cn } from '@/lib/utils';
interface IPot {
  name: string;
  target: number;
  total: number;
  theme: string;
}

interface AddWithdrawModalProps {
  title: string;
  pot: IPot;
  handleNewTotal: React.Dispatch<React.SetStateAction<number>>;
  newTotal: number;
}

const AddWithdrawModal: React.FC<AddWithdrawModalProps> = ({
  title,
  pot,
  handleNewTotal,
  newTotal,
}) => {
  const [model, setModel] = useState(false);
  const [inputAmount, setInputAmount] = useState<number | null>();

  const percenteg = Number((100 * newTotal) / pot.target).toFixed(2);
  const newNum: number = title.startsWith('Withdraw')
    ? +newTotal - Number(inputAmount)
    : +newTotal + Number(inputAmount);

  const [newPercent, setNewPercent] = useState<number | null | undefined>();
  console.log(newNum, 'number');

  useEffect(() => {
    setNewPercent(Number((100 * newNum) / pot.target));
  }, [newNum]);
  console.log(newPercent, 'percent');
  console.log(newNum, 'num');
  const colorMap: Record<string, string> = {
    '#277C78': 'bg-green-700',
    '#626070': 'bg-gray-600',
    '#82C9D7': 'bg-blue-300',
    '#F2CDAC': 'bg-orange-200',
    '#826CB0': 'bg-purple-500',
  };

  const handleSubmit = () => {
    if (inputAmount && inputAmount <= 0) {
      alert('Invalid amount');
      return setInputAmount(null);
    }
    if (title.startsWith('Withdraw')) {
      if (inputAmount && inputAmount > pot.total) {
        alert('Withdrawal amount exceeds total saved');
        return setInputAmount(null);
      }
      if (inputAmount && inputAmount <= pot.total) {
        const newNum = (pot.total = pot.total - inputAmount);
        setInputAmount(null);
        setNewPercent(null);
        console.log(newNum, 'withdraw');
        return handleNewTotal(newNum);
      }
    }

    if (inputAmount) {
      const newNum = (pot.total += inputAmount);
      console.log('deposit');
      setInputAmount(null);
      return handleNewTotal(newNum);
    }
  };
  const value = +percenteg > 100 ? 100 : +percenteg;
  const newPercentVal = newPercent
    ? +newPercent.toFixed(2) > 100
      ? 100
      : newPercent
    : null;
  console.log(newPercentVal, '"percent');

  return (
    <>
      <button
        className='bg-[#f8f4f0] w-full  hover:bg-white  text-normal font-bold text-[#201f24] flex justify-center p-[16px] rounded-lg cursor-pointer border border-[#f8f4f0]  hover:border-[#98908b] transition-colors ease-in-out duration-500 leading-[27px]'
        type='button'
        onClick={() => setModel(true)}
      >
        {title}
      </button>
      {model && (
        <div
          className={`fixed inset-0 z-20  flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
            model ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setModel(false)}
        >
          <div
            className={`bg-white max-w-[560px] w-full p-8 rounded-lg shadow-lg transition-transform duration-300 transform ${
              model ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between'>
              <h3>Add to '{pot.name}'</h3>
              <span>X</span>
            </div>
            <p>
              Add money to your pot to keep it separate from your main balance.
              As soon as you add this money, it will be deducted from your
              current balance.
            </p>
            <div>
              <div className='flex mt-[42px] justify-between'>
                <span className='font-normal text-sm text-[#696868] '>
                  Total Saved
                </span>
                <span className='font-bold text-3xl text-[#201f24]'>
                  $ {newNum}
                </span>
              </div>
              <div className='mt-4'>
                {/* <Progress
                  value={+value}
                  aria-valuenow={30}
                  className={`${colorMap[pot.theme]}`}
                /> */}
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
                          100 - (newPercentVal ? +newPercentVal : 0)
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
                          100 - (newPercentVal ? +newPercentVal : 0)
                        }%)`,
                      }}
                    ></div>
                  )}
                  <div
                    className={cn(
                      `h-full w-full absolute z-20  top-0  bg-[#277c78] transition-all `
                    )}
                    style={{
                      transform: `translateX(-${
                        100 - (newPercentVal ? +newPercentVal : 0)
                      }%)`,
                    }}
                  ></div>
                </div>
                {title.startsWith('Withdraw') ? (
                  <div className='flex justify-between mt-[13px]'>
                    <span
                      className={`font-bold text-[12px] leading-[18px] text-[#696868] ${
                        Number(newPercent) ? 'text-[#c94736]' : 'text-[#696868]'
                      }`}
                    >
                      {Number(newPercent)
                        ? Number(newPercent).toFixed(2)
                        : +percenteg}{' '}
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
                        Number(newPercent) ? 'text-[#277c78]' : 'text-[#696868]'
                      }`}
                    >
                      {Number(newPercent)
                        ? Number(newPercent).toFixed(2)
                        : +percenteg}{' '}
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
                  />
                </label>
              </div>
            </div>
            <button
              type='button'
              className='mt-4 bg-[#201f24] w-full text-white p-2 rounded'
              onClick={() => {
                setModel(false);
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
