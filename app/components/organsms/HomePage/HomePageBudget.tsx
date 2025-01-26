import { budget } from "@/app/map";
import Image from "next/image";
import Link from "next/link";
import BudgetSection from "../../moleculs/BudgetSection/BudgetSection";

export default function HomePageBudget() {
  return (
    <div className="max-w-[1000px] w-full bg-white rounded-xl mb-10 p-7">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl ">Budget</h2>
        <div>
          <Link href="/reccuringBills ">
            <p className="font-normal text-sm text-[#696868] hover:text-[#a3a2a2] transition ease-in-out duration-200">
              See Details
            </p>
          </Link>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <div className="max-w-[400px] w-full mr-4">
          <BudgetSection />
        </div>
        <div className="flex flex-col">
          {budget.map((el) => (
            <div key={el.id} className="flex gap-7 my-2 ">
              <div className="">
                <Image src={el.img} alt={el.title} width={6} height={0} />
              </div>
              <div>
                <p className="font-normal text-xs text-[#696868]">{el.title}</p>
                <p className="font-bold text-sm">{el.budget}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
