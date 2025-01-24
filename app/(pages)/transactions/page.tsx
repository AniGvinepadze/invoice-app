'use client';

import React, { useEffect, useState } from 'react';
import data from '../../local.json';

export default function Transition() {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Latest');
  const [category, setCategory] = useState('All Transactions');
  const [transactionType, setTransactionType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    setAccounts(data);
    setFilteredAccounts(data);
  }, []);

  useEffect(() => {
    let filtered = accounts;

    if (searchTerm) {
      filtered = filtered.filter((account) =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== 'All Transactions') {
      filtered = filtered.filter((account) => account.category === category);
    }

    if (transactionType !== 'All') {
      filtered = filtered.filter((account) =>
        transactionType === 'Income'
          ? account.amount.startsWith('+')
          : !account.amount.startsWith('+')
      );
    }

    switch (sortBy) {
      case 'Latest':
        filtered.sort(
          (a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)
        );
        break;
      case 'Oldest':
        filtered.sort(
          (a, b) => new Date(a.transaction_date) - new Date(b.transaction_date)
        );
        break;
      case 'A to Z':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z to A':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Lowest':
        filtered.sort(
          (a, b) =>
            parseFloat(b.amount.replace('$', '')) -
            parseFloat(a.amount.replace('$', ''))
        );
        break;
      case 'Highest':
        filtered.sort(
          (a, b) =>
            parseFloat(a.amount.replace('$', '')) -
            parseFloat(b.amount.replace('$', ''))
        );
        break;
      default:
        break;
    }

    setFilteredAccounts(filtered);
    setCurrentPage(1);
  }, [searchTerm, sortBy, category, transactionType, accounts]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredAccounts.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredAccounts.length / rowsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className='flex flex-col items-center'>
        <div>
          <h2>Transactions</h2>
        </div>
        <div className='flex items-center justify-between w-full mb-4 p-4 bg-white rounded-md shadow-md'>
          <div className='flex items-center border rounded-lg px-3 py-2'>
            <input
              type='text'
              placeholder='Search transaction'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='outline-none w-full'
            />
            <button className='text-gray-500'>🔍</button>
          </div>

          <div className='flex items-center mx-4'>
            <label className='mr-2 text-gray-700'>Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='border rounded-lg px-3 py-2'
            >
              <option value='Latest'>Latest</option>
              <option value='Oldest'>Oldest</option>
              <option value='A to Z'>A to Z</option>
              <option value='Z to A'>Z to A</option>
              <option value='Highest'>Highest</option>
              <option value='Lowest'>Lowest</option>
            </select>
          </div>

          <div className='flex items-center'>
            <label className='mr-2 text-gray-700'>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='border rounded-lg px-3 py-2'
            >
              <option value='All Transactions'>All Transactions</option>
              {Array.from(
                new Set(accounts.map((account) => account.category))
              ).map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className='flex items-center'>
            <label className='mr-2 text-gray-700'>Transaction Type</label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className='border rounded-lg px-3 py-2'
            >
              <option value='All'>All</option>
              <option value='Income'>Income</option>
              <option value='Expense'>Expense</option>
            </select>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='table-auto w-full'>
            <thead>
              <tr>
                <th className='px-4 py-2 text-left'>Recipient / Sender</th>
                <th className='px-4 py-2 text-left'>Category</th>
                <th className='px-4 py-2 text-left'>Transaction Date</th>
                <th className='px-4 py-2 text-left'>Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((account, index) => (
                <tr key={index} className='hover:bg-gray-100'>
                  <td className='px-4 py-2'>
                    {account.icon}
                    {account.name}
                  </td>
                  <td className='px-4 py-2'>{account.category}</td>
                  <td className='px-4 py-2'>{account.transaction_date}</td>
                  <td
                    className={`px-4 py-2 ${
                      account.amount.startsWith('+')
                        ? 'text-green-500'
                        : 'text-black'
                    }`}
                  >
                    {account.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex justify-center mt-4'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md mx-1 hover:bg-gray-300 disabled:opacity-50'
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md mx-1 hover:bg-gray-300 disabled:opacity-50'
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
