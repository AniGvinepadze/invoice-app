'use client';
import React, { useEffect, useState } from 'react';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import AddWithdrawModal from './addMoneyWithdrawModel';
import DeleteEditModal from './deleteEditModal';
import DeleteModal from './deleteModal';
import { IPots } from '@/app/(dashboard)/pots/page';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EditModal from './editModel';

interface IProps {
  pot: IPots;
  handleSetPots: React.Dispatch<React.SetStateAction<IPots[] | undefined>>;
}

export interface IViewerPot {
  total: number;
  potName: string;
  target: number;
  theme: string;
  _id: string;
}

const PotsContent: React.FC<IProps> = ({ pot, handleSetPots }) => {
  const [viewerPot, setViewerPot] = useState<IPots | null>(pot);
  const [newTotal, setNewTotal] = useState<number>(pot.total);
  const [val, setValue] = useState<string | undefined>();
  const [deleteItem, setDelete] = useState(false);

  const token = getCookie('accessToken') as string;

  useEffect(() => {
    setViewerPot(pot);
    setNewTotal(pot.total);
  }, [pot]);

  const percentage =
    pot.target === 0 ? 0 : (100 * (newTotal || 0)) / pot.target;
  const percenteg = percentage.toFixed(2);

  const colorMap: Record<string, string> = {
    '#277C78': 'bg-green-700',
    '#626070': 'bg-gray-600',
    '#82C9D7': 'bg-blue-300',
    '#F2CDAC': 'bg-orange-200',
    '#826CB0': 'bg-purple-500',
  };

  useEffect(() => {
    const updatePot = async () => {
      const newPot = { ...viewerPot, total: newTotal };

      try {
        await axios.patch(`http://localhost:3001/pots/${pot._id}`, newPot, {
          headers: { authorization: `Bearer ${token}` },
        });
        setViewerPot(newPot);
      } catch (err) {
        console.error('Failed to update pot:', err);

        setNewTotal(viewerPot.total);
      }
    };

    if (newTotal !== viewerPot.total) {
      updatePot();
    }
  }, [newTotal, pot._id, token, viewerPot]);

  useEffect(() => {
    const deletePot = async () => {
      try {
        await axios.delete(`http://localhost:3001/pots/${pot._id}`, {
          headers: { authorization: `Bearer ${token}` },
        });
        handleSetPots((prev) => prev?.filter((p) => p._id !== pot._id));
      } catch (err) {
        console.error('Failed to delete pot:', err);
      } finally {
        setDelete(false);
      }
    };

    if (deleteItem) deletePot();
  }, [deleteItem, pot._id, token, handleSetPots]);

  if (!viewerPot) return null;

  return (
    <>
      <div className='xl:p-6 px-6 py-8 bg-white rounded-[12px]'>
        <div className='flex justify-between'>
          <div className='flex gap-4 items-center'>
            <div
              className={`w-4 h-4 rounded-full ${colorMap[viewerPot.theme]}`}
            ></div>
            <h3 className='font-bold text-[#201f24] text-xl'>
              {viewerPot.potName}
            </h3>
          </div>
          <DeleteEditModal handleValue={setValue} />
        </div>
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
            <Progress
              value={Math.min(Number(percenteg), 100)}
              className={`${colorMap[viewerPot.theme]}`}
            />
            <div className='flex justify-between mt-[13px]'>
              <span className='font-bold text-[12px] leading-[18px] text-[#696868]'>
                {percenteg} %
              </span>
              <span className='font-normal text-[12px] leading-[18px] text-[#696868]'>
                Target of ${viewerPot.target}
              </span>
            </div>
          </div>
          <div className='mt-8 flex justify-between gap-4'>
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

      {val?.startsWith('Delete') && (
        <DeleteModal handleDelete={setDelete} handleValue={setValue} />
      )}
      {val?.startsWith('Edit') && (
        <EditModal
          handleValue={setValue}
          handleViewerPot={setViewerPot}
          viewerPot={pot as IViewerPot}
        />
      )}
    </>
  );
};

export default PotsContent;
