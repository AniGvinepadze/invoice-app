import BudgetModal from '@/app/components/organsms/BudgetModal/BudgetModal';
import React from 'react';
import data from '@/data.json';
function Pots() {
  const pots = data.pots;
  console.log(pots);
  return (
    <div className='px-10  pt-8 pb-[48px] w-full h-screen'>
      <div className='flex justify-between items-center'>
        <h1>Pots</h1>
        <BudgetModal />
      </div>
    </div>
  );
}

export default Pots;
