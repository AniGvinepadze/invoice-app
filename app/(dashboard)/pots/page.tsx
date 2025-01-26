'use client';
import BudgetModal from '@/app/components/organsms/BudgetModal/BudgetModal';
import React, { useEffect, useState } from 'react';
import data from '@/data.json';
import PotsContent from '@/app/components/moleculs/pots/potsContent';
function Pots() {
  const [pots, setPots] = useState(data.pots || []);
  useEffect(() => {
    console.log(pots, 'set');
  }, [pots]);
  return (
    <div className='px-10  pt-8 pb-[48px] w-full overflow-x-hidden overflow-scroll h-screen'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-3xl'>Pots</h1>
        <BudgetModal handleSetPots={setPots} />
      </div>
      <div className='grid mt-8 grid-cols-1 xl:grid-cols-2 gap-6 justify-between'>
        {pots.map((p, i) => {
          return (
            <PotsContent key={i} index={i} pot={p} handleSetPots={setPots} />
          );
        })}
      </div>
    </div>
  );
}

export default Pots;
