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

interface IPot {
  potName: string;
  target: number;
  total: number;
  theme: string;
  _id: string;
}
interface IProps {
  pot: IPot;

  index: number;
  handleSetPots: React.Dispatch<React.SetStateAction<IPots[] | undefined>>;
}

export interface IViewerPot {
  total: number | undefined;
  potName: string;
  target: number;
  theme: string;
  _id: string;
}

const PotsContent: React.FC<IProps> = ({ pot, index, handleSetPots }) => {
  const [viewerPot, setViewerPot] = useState<IViewerPot | null>(pot);
  const [newTotal, setNewTotal] = useState<number | undefined>(pot.total);
  const [val, setValue] = useState<string | undefined>();
  const [deleteItem, setDelete] = useState(false);
  const router = useRouter();

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

  const token = getCookie('accessToken') as string;

  useEffect(() => {
    const newPot = {
      ...pot,
      total: newTotal,
    };

    setViewerPot(newPot);

    const updatePot = async () => {
      try {
        await axios.patch(`http://localhost:3001/pots/${pot._id}`, newPot, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.log(err);
      }
    };
    updatePot();
  }, [newTotal]);

  useEffect(() => {
    if (deleteItem) {
      const deletePot = async () => {
        try {
          await axios.delete(`http://localhost:3001/pots/${pot._id}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
        } catch (err) {
          console.log(err);
        }
      };
      setViewerPot(null);
      deletePot();
      router.refresh();
    }
  }, [deleteItem, val]);

  if (!viewerPot) return null;

  return (
    <>
      <div className='xl:p-6 px-6 py-8 bg-white rounded-[12px]'>
        <div className='flex justify-between'>
          <div className='flex gap-4 items-center'>
            <div
              className={`w-4 h-4  rounded-full ${colorMap[viewerPot.theme]}`}
            ></div>
            <h3 className='font-bold  text-[#201f24] text-xl '>
              {' '}
              {viewerPot.potName}
            </h3>
          </div>
          <DeleteEditModal
            handleValue={setValue}

            // handleSetPots={handleSetPots}
          />
        </div>
        <div>
          <div className='flex mt-[42px] justify-between'>
            <span className='font-normal text-sm text-[#696868] '>
              Total Saved
            </span>
            <span className='font-bold text-3xl text-[#201f24]'>
              $ {newTotal}
            </span>
          </div>
          <div className='mt-4'>
            <Progress
              value={+percenteg > 100 ? 100 : +percenteg}
              className={`${colorMap[viewerPot.theme]}`}
            />
            <div className='flex justify-between mt-[13px]'>
              <span className='font-bold text-[12px] leading-[18px] text-[#696868]'>
                {+percenteg} %
              </span>

              <span className='font-normal text-[12px] leading-[18px] text-[#696868]'>
                Target of ${viewerPot.target}
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
      {val && val.startsWith('Edit') && (
        <EditModal
          handleDelete={setDelete}
          handleValue={setValue}
          handleViewerPot={setViewerPot}
          viewerPot={viewerPot}
        />
      )}
    </>
  );
};

export default PotsContent;
