import {
  activeBils,
  activebudget,
  activeome,
  activetrans,
  activPots,
  budgets,
  home,
  pots,
  recurringBills,
  trabsactions,
} from ".";

export const sidebar = [
  { id: 1, title: "Overview", img: home, activeImg: activeome, route: "/" },
  {
    id: 2,
    title: "Transactions",
    img: trabsactions,
    activeImg: activetrans,
    route: "/transactions",
  },
  {
    id: 3,
    title: "Budgets",
    img: budgets,
    activeImg: activebudget,
    route: "/budgets",
  },

  { id: 4, title: "Pots", img: pots, activeImg: activPots, route: "/pots" },
  {
    id: 5,
    title: "Recurring bills",
    img: recurringBills,
    activeImg: activeBils,
    route: "/recurringBills",
  },
];

export type BalancesType = {
  id: number;
  title: string;
  budget: string;
};

export const balances: BalancesType[] = [
  {
    id: 1,
    title: "Current Balance",
    budget: "$4,836.00",
  },
  {
    id: 2,
    title: "Income",
    budget: "$3,814.25",
  },
  {
    id: 3,
    title: "Expenses",
    budget: "$1,700.50",
  },
];
