'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { IPots } from '@/app/(dashboard)/pots/page';
import {motion} from "framer-motion"

interface IBudget {
  handleNewPot: React.Dispatch<React.SetStateAction<IPots | undefined>>;
}

const BudgetModal: React.FC<IBudget> = ({ handleNewPot }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, control, reset } = useForm();
  const [selectedTheme, setSelectedTheme] = useState('');
  const router = useRouter();

  const colorMap: Record<string, string> = {
    '#277C78': 'bg-green-700',
    '#626070': 'bg-gray-600',
    '#82C9D7': 'bg-blue-300',
    '#F2CDAC': 'bg-orange-200',
    '#826CB0': 'bg-purple-500',
  };

  const token = getCookie('accessToken');

  const onSubmit = async (data: any) => {
    const newPot: IPots = {
      potName: data.potName,
      target: +data.target,
      theme: data.selectVal,
      total: 0,
    };
  

    handleNewPot(newPot);
    // reset();
    // setIsModalOpen(false);
  };

  return (
    <>
      <motion.button
        className='bg-[#201F24] text-normal font-bold text-white flex justify-center p-[16px] rounded-lg cursor-pointer hover:bg-[#696868] transition-colors ease-in-out duration-300 leading-[27px] z-40'
        type='button'
        onClick={() => setIsModalOpen(true)}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1 }}
        viewport={{
          once: true,
        }}
      >
        + Add New Pot
      </motion.button>
      {isModalOpen && (
        <div
          className='fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300'
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className='bg-white z-50 p-8 rounded-lg shadow-lg transition-transform duration-300 transform scale-100 opacity-100'
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className='font-bold text-xl mb-4'>Add New Pot</h4>
            <p className='mb-6 text-gray-600'>
              Create a pot to set savings targets. These can help keep you on
              track as you save for special purchases.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Pot Name
                </label>
                <input
                  type='text'
                  className='w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#201F24]'
                  placeholder='Enter pot name'
                  required
                  {...register('potName')}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Target
                </label>
                <div className='flex items-center border rounded-lg py-2 px-3 focus-within:ring-2 focus-within:ring-[#201F24]'>
                  <span className='text-gray-500'>$</span>
                  <input
                    type='number'
                    className='w-full pl-2 focus:outline-none'
                    placeholder='Enter target amount'
                    required
                    min={0}
                    {...register('target')}
                  />
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Theme
                </label>
                <Controller
                  name='selectVal'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={selectedTheme}
                      onValueChange={(value) => {
                        setSelectedTheme(value);
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className='flex gap-4 justify-start'>
                        <div
                          className={`w-4 h-4 rounded-full ${
                            colorMap[selectedTheme] || 'bg-gray-300'
                          }`}
                        ></div>
                        <SelectValue placeholder='Select a theme' />
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
                className='w-full bg-[#201F24] text-white py-2 rounded-lg hover:bg-[#696868] transition-colors duration-300'
              >
                Create Pot
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BudgetModal;
