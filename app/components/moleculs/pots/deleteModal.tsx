'use client';
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

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
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex justify-between'>
            <span>X</span>
          </div>
          <p>
            Add money to your pot to keep it separate from your main balance. As
            soon as you add this money, it will be deducted from your current
            balance.
          </p>
          <div></div>
          <button
            type='button'
            className='mt-4 bg-[#201f24] w-full text-white p-2 rounded'
            onClick={() => {
              handleDelete(true);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
