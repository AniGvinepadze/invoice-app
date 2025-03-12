"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ReccuirngBillPopUp = ({
  setShow,
  addBill,
  bills,
  setBills

}: {
  bills: any[]
  setShow: any;
  addBill: any;
  setBills:any
}) => {
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    billTitle: "",
    date: "",
    bill_amount: "",
  });

  const handleClickDisappear = () => setShow(false);

  const router = typeof window !== "undefined" ? useRouter() : null;

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      [name]: type === "number" ? Number(value) || 0 : value,
    }));
  };

  const token = getCookie("accessToken") as string;

  const sendPostRequest = async () => {
    if (
      !formData.billTitle.trim() ||
      !formData.date.trim() ||
      !formData.bill_amount.trim()
    ) {
      return;
    }
    
     try {
      const response = await axios.post(
        "http://localhost:3001/reccuringbills",
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            dueDate: formData.date,
          }),
        }
      );
      handleClickDisappear();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:3001/reccuringbills", formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
  
      const addedBill = response.data; 
  
      addBill(addedBill);
    
      handleClickDisappear();
    } catch (e) {
      console.error("Error adding bill:", e);
    }
  };
  

  useEffect(() => {
    const getCurrentUser = async () => {
      if (!token || !router) return;
      try {
      
        const response = await axios.get(
          "http://localhost:3001/auth/current-user",
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (err) {
        router.push("/login");
      }
    };

    getCurrentUser();
  }, [token, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/reccuringbills",
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setBills(response.data);
      } catch (err) {
        console.error("Error fetching bills:", err);
      }
    };
  
    fetchData();
  }, [bills]); 
  
  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[560px] p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Add New Bill</h2>
          <button
            onClick={handleClickDisappear}
            className="text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
        </div>
        <p className="text-gray-600 mt-2">
          Create New Bill. These can help keep you on track as you save for
          special purchases.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="billTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Bill Name
            </label>
            <input
              id="billTitle"
              name="billTitle"
              value={formData.billTitle}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Rainy Days"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            />
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              name="date"
              value={formData.date}
              onChange={handleChange}
              type="text"
              placeholder="e.g. 14th"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            />
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              id="amount"
              name="bill_amount"
              value={formData.bill_amount}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 300"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-md"
            >
              Add Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReccuirngBillPopUp;
