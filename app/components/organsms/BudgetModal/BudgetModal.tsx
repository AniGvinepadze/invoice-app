'use client';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import dataPots from '@/data.json';

interface IBudget {
  handleSetPots?:
    | React.Dispatch<
        React.SetStateAction<
          {
            name: string;
            target: number;
            total: number;
            theme: string;
          }[]
        >
      >
    | undefined;
}
const BudgetModal: React.FC<IBudget> = ({ handleSetPots }) => {
  const [model, setModel] = useState(false);
  const { register, handleSubmit, control, reset } = useForm();
  const [selectVal, setSelectVal] = useState('');

  const colorMap: Record<string, string> = {
    '#277C78': 'bg-green-700',
    '#626070': 'bg-gray-600',
    '#82C9D7': 'bg-blue-300',
    '#F2CDAC': 'bg-orange-200',
    '#826CB0': 'bg-purple-500',
  };

  const onsubmit = (data: any) => {
    const newPot = {
      name: data.potName,
      target: +data.target,
      theme: data.selectVal,
      total: 0,
    };

    if (handleSetPots) {
      handleSetPots((prev) => [...prev, newPot]);
    }
    reset();
    setModel(false);
  };

  return (
    <>
      <button
        className='bg-[#201F24] text-normal font-bold text-white flex justify-center p-[16px] rounded-lg cursor-pointer hover:bg-[#696868] transition-colors ease-in-out duration-300 leading-[27px] z-40'
        type='button'
        onClick={() => setModel(true)}
      >
        + Add New Pot
      </button>
      {model && (
        <div
          className={`fixed inset-0 z-20 flex overflow-y-hidden items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 z-20${
            model ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setModel(false)}
        >
          <div
            className={`bg-white z-50  p-8 rounded-lg shadow-lg transition-transform duration-300 transform ${
              model ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Add New Pot</h4>

            <p>
              Create a pot to set savings targets. These can help keep you on
              track as you save for special purchases.
            </p>
            <form onSubmit={handleSubmit(onsubmit)}>
              <span>Pot Name</span>
              <label className='border rounded-[8px]  focus:border-0 flex py-3  px-[20px] border-[#98908b] justify-center gap-4'>
                <input
                  type='text'
                  className='w-full'
                  placeholder=''
                  min={0}
                  {...register('potName')}
                />
              </label>
              <span>Target</span>
              <label className='border rounded-[8px]  focus:border-0 flex py-3  px-[20px] border-[#98908b] justify-center gap-4'>
                <span>$</span>
                <input
                  type='number'
                  className='w-full'
                  placeholder=''
                  min={0}
                  {...register('target')}
                />
              </label>
              <div className='flex flex-col space-y-1.5'>
                <label htmlFor='theme-select'>Theme</label>
                <Controller
                  name='selectVal'
                  control={control}
                  defaultValue={null} // Ensure default value
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={selectVal}
                      onValueChange={(e) => {
                        setSelectVal(e);
                        field.onChange(e); // Sync with react-hook-form
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
                              : 'bg-gray-300' // Default color
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

              <p>Your modal content goes here.</p>
              <button
                type='submit'
                className='mt-4 bg-red-500 text-white p-2 rounded'
                // onClick={() => setModel(false)}
              >
                Closesaw
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BudgetModal;
