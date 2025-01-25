'use client';
import React, { useState } from 'react';

function BudgetModal() {
  const [model, setModel] = useState(false);

  return (
    <>
      <button
        className='bg-[#201F24] text-normal font-bold text-white flex justify-center p-[16px] rounded-lg cursor-pointer hover:bg-[#696868] transition-colors ease-in-out duration-300 leading-[27px]'
        type='button'
        onClick={() => setModel(true)}
      >
        + Add New Budget
      </button>
      {model && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
            model ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setModel(false)}
        >
          <div
            className={`bg-white p-8 rounded-lg shadow-lg transition-transform duration-300 transform ${
              model ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <p>Your modal content goes here.</p>
            <button
              type='button'
              className='mt-4 bg-red-500 text-white p-2 rounded'
              onClick={() => setModel(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BudgetModal;
