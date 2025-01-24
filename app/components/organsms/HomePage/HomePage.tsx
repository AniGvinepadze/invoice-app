import HomePageBalance from "./HomePageBalance";
import HomePageBudget from "./HomePageBudget";
import HomePagePots from "./HomePagePots";
import HomePageRecurringBills from "./HomePageRecurringBills";
import HomePageTransactions from "./HomePageTransactions";

export default function HomePage() {
  return (
    <div className="p-6 ">
      <HomePageBalance />
      <div className=" flex justify-between">
        <div>
          <HomePagePots />
          <HomePageTransactions />
        </div>
        <div className="mx-4">
          <HomePageBudget/>
          <HomePageRecurringBills />
        </div>
      </div>
    </div>
  );
}
