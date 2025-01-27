import {
  activeBils,
  activebudget,
  activeome,
  activetrans,
  activPots,
  budgets,
  colorTag1,
  colorTag2,
  colorTag3,
  colorTag4,
  home,
  pots,
  recurringBills,
  trabsactions,
} from '.';

export const sidebar = [
  { id: 1, title: 'Overview', img: home, activeImg: activeome, route: '/' },
  {
    id: 2,
    title: 'Transactions',
    img: trabsactions,
    activeImg: activetrans,
    route: '/transactions',
  },
  {
    id: 3,
    title: 'Budgets',
    img: budgets,
    activeImg: activebudget,
    route: '/budgets',
  },

  { id: 4, title: 'Pots', img: pots, activeImg: activPots, route: '/pots' },
  {
    id: 5,
    title: 'Recurring bills',
    img: recurringBills,
    activeImg: activeBils,
    route: '/recurringbills',
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

export type PotsType = {
  id: number;
  title: string;
  budget: string;
  img: string;
};

export const pot: PotsType[] = [
  {
    id: 1,
    title: "Savings",
    budget: "$159",
    img: colorTag1,
  },
  {
    id: 2,
    title: "Gift",
    budget: "$40",
    img: colorTag2,
  },
  {
    id: 3,
    title: "Concert Ticket",
    budget: "$110",
    img: colorTag3,
  },
  {
    id: 4,
    title: "New Laptop",
    budget: "$10",
    img: colorTag4,
  },
];

export type TransactionsType = {
  id: number;
  name: string;
  budget: string;
  date: string;
};

export const transaction: TransactionsType[] = [
  {
    id: 1,
    name: "Emma Richardson",
    budget: "+$75.50",
    date: "19 Aug 2024",
  },
  {
    id: 2,
    name: "Savory Bites Bistro",
    budget: "-$55.50",
    date: "19 Aug 2024",
  },
  {
    id: 3,
    name: "Daniel Carter",
    budget: "-$42.30",
    date: "18 Aug 2024",
  },
  {
    id: 4,
    name: "Sun Park",
    budget: "+$120.00",
    date: "17 Aug 2024",
  },
  {
    id: 5,
    name: "Urban Services Hub",
    budget: "-$65.00",
    date: "17 Aug 2024",
  },
];

export const recBills: BalancesType[] = [
  {
    id: 1,
    title: "Paid Bills",
    budget: "$190.00",
  },
  {
    id: 2,
    title: "Total Upcoming",
    budget: "$194.98",
  },
  {
    id: 3,
    title: "Due Soon",
    budget: "$59.98",
  },
];

export const budget: PotsType[] = [
  {
    id: 1,
    title: "Entertainment",
    budget: "$50.00",
    img: colorTag1,
  },
  {
    id: 2,
    title: "Bills",
    budget: "$750.00",
    img: colorTag2,
  },
  {
    id: 3,
    title: "Personal Care",
    budget: "$100.00",
    img: colorTag3,
  },
  {
    id: 4,
    title: "Dining Out",
    budget: "$75.00",
    img: colorTag4,
  },
];


