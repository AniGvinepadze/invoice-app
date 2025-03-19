import HomePageBalance from './HomePageBalance';
import HomePageBudget from './HomePageBudget';
import HomePagePots from './HomePagePots';
import HomePageRecurringBills from './HomePageRecurringBills';
import HomePageTransactions from './HomePageTransactions';

export default function HomePage() {
  return (
    <div className='max-w-[1440px] overflow-x-hidden overflow-scroll h-screen w-full p-7 max-600:p-5 max-400:p-2 '>
      <HomePageBalance />
      <div className=' flex justify-between gap-4 max-1350:flex-col'>
        <div className='max-w-[1440px] w-full  '>
          <HomePagePots />
          <HomePageTransactions />
        </div>
        <div className=' max-w-[1440px] w-full '>
          <HomePageBudget />
          <HomePageRecurringBills />
        </div>
      </div>
    </div>
  );
}
