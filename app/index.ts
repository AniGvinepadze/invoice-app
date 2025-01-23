import React from 'react';
import loginImg from '../public/assets/Sidebar.svg';
import home from '../public/assets/home.svg';
import budgets from '../public/assets/recurringbills.svg';
import activeome from '../public/assets/activeHome.svg';
import trabsactions from '../public/assets/transactions.svg';
import pots from '../public/assets/Pots.svg';
import recurringBills from '../public/assets/budgets.svg';
import activetrans from '../public/assets/activeTransactiond.svg';
import activebudget from '../public/assets/activebudgets.svg';
import activPots from '../public/assets/activePots.svg';
import activeBils from '../public/assets/activebills.svg';
import circleImg from '@/public/assets/circle.svg';

interface CircleProps {
  color?: string; // Optional color prop
}

function Circle({ color = '#277C78' }) {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='8' cy='8' r='8' fill={color} />
    </svg>
  );
}

export {
  loginImg,
  home,
  budgets,
  activeome,
  trabsactions,
  pots,
  recurringBills,
  activPots,
  activeBils,
  activebudget,
  activetrans,
};
