'use client';

import React, { useEffect, useState } from 'react';
import billData from '../../bills';
import billIcon from '../../../public/assets/bills.svg';
import Image from 'next/image';

export default function RecurringBills() {
  const [billsList, setBillsList] = useState(billData);
  const [filteredBills, setFilteredBills] = useState(billData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Latest');
  const [category, setCategory] = useState('All Transactions');
  const [totalBills, setTotalBills] = useState(0);
  const [paidBIlls, setPaidBills] = useState(0);
  const [unPaidBIlls, setUnPaidBills] = useState(0);
  const [quantityPaid, setQuantitiyPaid] = useState(0);
  const [quantityUnPaid, setQuantitiyUnPaid] = useState(0);

  useEffect(() => {
    let filtered = [...billsList];

    if (searchTerm) {
      filtered = filtered.filter((bill) =>
        bill.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== 'All Transactions') {
      filtered = filtered.filter((bill) => bill.category === category);
    }

    switch (sortBy) {
      case 'A to Z':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z to A':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Lowest':
        filtered.sort((a, b) => a.amount - b.amount);
        break;
      case 'Highest':
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      default:
        break;
    }

    setTotalBills(
      billsList
        .filter((bill) => bill.amount)
        .reduce((acc, bill) => acc + bill.amount, 0)
    );
    setFilteredBills(filtered);
    setPaidBills(
      billsList
        .filter((bill) => bill.isPaid)
        .reduce((acc, bill) => acc + bill.amount, 0)
    );
    setUnPaidBills(
      billsList
        .filter((bill) => !bill.isPaid)
        .reduce((acc, bill) => acc + bill.amount, 0)
    );
    setQuantitiyPaid(billsList.filter((bill) => bill.isPaid).length);
    setQuantitiyUnPaid(billsList.filter((bill) => !bill.isPaid).length);
  }, [searchTerm, sortBy, category, billsList]);

  return (
    <div className='px-4 md:px-[40px] max-w-[1060px] w-full mx-auto'>
      <h2 className='font-bold text-[32px] p-4'>Recurring Bills</h2>
      <div className='flex flex-col md:flex-row justify-between p-4 gap-8'>
        <div className='flex flex-col sm:flex-row md:flex-col justify-between  md:max-w-[340px] w-full max-h-[400px]  gap-4 md:gap-0  '>
          <div className='bg-[#1A1C24] sm:h-[200px] max-h[190px] md:h-full text-white flex flex-col items-start  md:max-w-[200px] w-full rounded-md shadow-lg p-6 mb-4'>
            <Image
              src={billIcon}
              alt='Bill Icon'
              width={24}
              height={24}
              className='mb-2'
            />
            <h4 className='text-lg font-semibold'>Total Bills</h4>
            <p className='text-2xl font-bold'>{totalBills}</p>
          </div>

          <div className='bg-white flex flex-col items-start rounded-md shadow-lg p-2 sm:h-[200px] max-h[190px] md:h-full md:max-w-[200px] w-full'>
            <h3 className='text-lg font-semibold mb-2'>Summary</h3>
            <p className='text-sm'>
              Paid Bills:
              <span className='font-bold'>
                {quantityPaid}({paidBIlls})
              </span>
            </p>
            <p className='text-sm'>
              Unpaid Bills:
              <span className='font-bold'>
                {quantityUnPaid}({unPaidBIlls})
              </span>
            </p>
          </div>
        </div>

        <div className='flex-1 md:max-w-[73v    0px] w-full mx-auto px-6 bg-white rounded-lg shadow-md mt-4 md:mt-0'>
          <div className='flex flex-col md:flex-row items-center justify-between mb-4 py-6 gap-3'>
            <label className=' font-semibold '>Search</label>
            <input
              type='text'
              placeholder='Search bills...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto'
            />

            <label className='mx-4 font-semibold'>Type</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto'
            >
              <option value='All Transactions'>All Transactions</option>
              <option value='Utilities'>Utilities</option>
              <option value='Health & Wellness'>Health & Wellness</option>
              <option value='Education'>Education</option>
              <option value='Entertainment'>Entertainment</option>
              <option value='Technology'>Technology</option>
            </select>

            <label className='mx-4 font-semibold'>Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto'
            >
              <option value='Latest'>Latest</option>
              <option value='A to Z'>A to Z</option>
              <option value='Z to A'>Z to A</option>
              <option value='Lowest'>Lowest</option>
              <option value='Highest'>Highest</option>
            </select>
          </div>

          <div className='overflow-x-auto'>
            <table className='table-auto w-full border-collapse text-left'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='py-3 text-sm font-medium text-gray-600'>
                    Bill Title
                  </th>
                  <th className='py-3 text-sm font-medium text-gray-600'>
                    Status
                  </th>
                  <th className='py-3 text-sm font-medium text-gray-600'>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.map((bill, index) => (
                  <tr
                    key={bill.name}
                    className={`hover:bg-gray-50 ${
                      index !== filteredBills.length - 1 ? 'border-b' : ''
                    }`}
                  >
                    <td className='py-2 flex items-center gap-2'>
                      <span>{bill.icon}</span>
                      <span className='text-gray-800'>{bill.name}</span>
                    </td>
                    <td
                      className={`py-2 font-semibold ${
                        bill.isPaid ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {bill.isPaid ? '✅' : '❌'}
                    </td>
                    <td className='py-2 text-gray-800'>
                      ${bill.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
