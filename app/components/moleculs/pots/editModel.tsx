'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import axios from 'axios';
import { IPots } from '@/app/(dashboard)/pots/page';
import closeSvg from '@/public/assets/close.svg';
import Image from 'next/image';

interface IDeleteModal {
  handleValue: Dispatch<SetStateAction<string | undefined>>;
  handleViewerPot: Dispatch<SetStateAction<IPots | undefined>>;
  viewerPot: IPots;
}

const EditModal: React.FC<IDeleteModal> = ({
  handleValue,
  handleViewerPot,
  viewerPot,
}) => {
  const router = useRouter();
  const [model, setModel] = useState(false);
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      potName: viewerPot.potName,
      theme: viewerPot.theme,
      target: viewerPot.target,
    },
  });
  const [selectVal, setSelectVal] = useState(viewerPot.theme);

  const colorMap: Record<string, string> = {
    '#277C78': 'bg-green-700',
    '#626070': 'bg-gray-600',
    '#82C9D7': 'bg-blue-300',
    '#F2CDAC': 'bg-orange-200',
    '#826CB0': 'bg-purple-500',
  };

  const token = getCookie('accessToken');
  console.log(viewerPot, 'dataaasssssssssssa');

  const onsubmit = async (data: any) => {
    const newPot: {
      potName: string;
      target: number;
      theme: string;
    } = {
      potName: data.potName,
      target: +data.target,
      theme: selectVal,
    };

    handleViewerPot((prev) =>
      prev
        ? {
            ...prev,
            potName: data.potName,
            target: +data.target,
            theme: selectVal,
          }
        : undefined
    );
    const updatePot = async () => {
      try {
        await axios.patch(
          `https://invoiceappback.onrender.com/pots/${viewerPot._id}`,
          newPot,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    updatePot();

    reset();
    // handleDelete(false);
    handleValue('');
    setModel(false);
  };
  return (
    <>
      <div
        className={
          'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300'
        }
      >
        <div
          className={
            'bg-white max-w-[560px] w-full p-8 rounded-lg shadow-lg transition-transform duration-300 transform'
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className='flex justify-between mb-[20px]'>
            <p className=' font-bold text-3xl text-[#201f24]'>Edit Pot</p>
            <div className='flex justify-between cursor-pointer'>
              <span className='cursor-pointer ' onClick={() => handleValue('')}>
                <Image src={closeSvg} alt='close button' />
              </span>
            </div>
          </div>
          <p className='mb-[20px] text-sm text-[#696868]'>
            If your saving targets change, feel free to update your pots.
          </p>
          <div>
            <form onSubmit={handleSubmit(onsubmit)}>
              <span className='text-[12px] font-bold text-[#696868]'>
                Pot Name
              </span>
              <label className='border rounded-[8px] mb-4  focus:border-0 flex py-3  px-[20px] border-[#98908b] justify-center gap-4'>
                <input
                  type='text'
                  className='w-full'
                  placeholder=''
                  required
                  min={0}
                  {...register('potName')}
                />
              </label>
              <span className='text-[12px] font-bold text-[#696868]'>
                Target
              </span>
              <label className='border rounded-[8px] mb-4 focus:border-0 flex py-3  px-[20px] border-[#98908b] justify-center gap-4'>
                <span>$</span>
                <input
                  type='number'
                  className='w-full'
                  placeholder=''
                  required
                  min={0}
                  {...register('target')}
                />
              </label>
              <div className='flex flex-col space-y-1.5 mb-4'>
                <label
                  htmlFor='theme-select'
                  className='text-[12px] font-bold text-[#696868]'
                >
                  Theme
                </label>
                <Controller
                  name='theme'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={selectVal}
                      onValueChange={(e) => {
                        setSelectVal(e);
                        field.onChange(e);
                      }}
                    >
                      <SelectTrigger
                        id='theme-select'
                        className='flex gap-4 justify-start'
                      >
                        <div
                          className={`w-4 h-4 rounded-full ${
                            selectVal === '#277C78'
                              ? 'bg-green-500'
                              : selectVal === '#626070'
                              ? 'bg-gray-500'
                              : selectVal === '#82C9D7'
                              ? 'bg-blue-500'
                              : selectVal === '#F2CDAC'
                              ? 'bg-orange-500'
                              : selectVal === '#826CB0'
                              ? 'bg-purple-500'
                              : 'bg-gray-300'
                          }`}
                        ></div>
                        <div className='flex-1 justify-between flex'>
                          <SelectValue
                            placeholder='Select'
                            className={`flex justify-between flex-1 w-full ${
                              !selectVal ? 'text-gray-400' : 'text-black'
                            }`}
                          />
                        </div>
                      </SelectTrigger>

                      <SelectContent position='popper'>
                        <SelectItem value='#277C78'>Green</SelectItem>
                        <SelectItem value='#626070'>Gray</SelectItem>
                        <SelectItem value='#82C9D7'>Blue</SelectItem>
                        <SelectItem value='#F2CDAC'>Orange</SelectItem>
                        <SelectItem value='#826CB0'>Purple</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <button
                type='submit'
                className='mt-4 bg-red-500 text-white p-2 rounded'
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
