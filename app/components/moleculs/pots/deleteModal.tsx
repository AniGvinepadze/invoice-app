'use client';
import React from 'react';
import closeSvg from '@/public/assets/close.svg';
import Image from 'next/image';
interface IDeleteModal {
  handleDelete: React.Dispatch<React.SetStateAction<boolean>>;
  handleValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const DeleteModal: React.FC<IDeleteModal> = ({ handleDelete, handleValue }) => {
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
            <p className=' font-bold text-3xl text-[#201f24]'>
              Delete ‘Savings’?
            </p>
            <div className='flex justify-between cursor-pointer'>
              <span className='cursor-pointer ' onClick={() => handleValue('')}>
                <Image src={closeSvg} alt='close button' />
              </span>
            </div>
          </div>
          <p className='mb-[20px] text-sm text-[#696868]'>
            Are you sure you want to delete this pot? This action cannot be
            reversed, and all the data inside it will be removed forever.
          </p>

          <button
            type='button'
            className='mt-4 bg-[#201f24] w-full text-white p-2 rounded'
            onClick={() => {
              handleDelete(true);
              handleValue('');
            }}
          >
            Yes, Confirm Deletion
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
