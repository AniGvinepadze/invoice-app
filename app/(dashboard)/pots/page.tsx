import BudgetModal from '@/app/components/organsms/BudgetModal/BudgetModal';
import React from 'react';
import data from '@/data.json';
import PotsContent from '@/app/components/moleculs/pots/potsContent';
function Pots() {
  const pots = data.pots;
  console.log(pots);

  return (
    <div className='px-10  pt-8 pb-[48px] w-full h-screen'>
      <div className='flex justify-between items-center'>
        <h1>Pots</h1>
        <BudgetModal />
      </div>
      <div className='grid grid-cols-2 gap-6 justify-between'>
        {pots.map((p, i) => {
          return <PotsContent key={i} pot={p} />;
        })}
      </div>
    </div>
  );
}

export default Pots;
