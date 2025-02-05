import React, { useState } from "react";

const ReccuirngBillPopUp = ({
  setShow,
  addBill,
}: {
  setShow: any;
  addBill: any;
}) => {
  const handleClickDisappear = () => {
    setShow(false);
  };

  const [formData, setFormData] = useState({
    billName: "",
    frequency: "",
    dueDate: "",
    status: "",
    amount: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  console.log(formData.status);

  const sendPostRequest = async () => {
    if (
      !formData.billName.trim() ||
      !formData.frequency.trim() ||
      !formData.dueDate.trim() ||
      !formData.amount.trim()
    ) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/reccuringbills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount),
          dueDate: `${formData.dueDate}`,
          status: `${formData.status}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add the bill. Please try again.");
      }

      const newBill = await response.json();
      addBill(newBill); // Call addBill to update the bills list
      alert("Bill added successfully!");
      handleClickDisappear(); // Hide the popup after submission
    } catch (error) {
      console.error("Error submitting form:", error);
    
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendPostRequest();
  };

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
              htmlFor="billName"
              className="block text-sm font-medium text-gray-700"
            >
              Bill Name
            </label>
            <input
              id="billName"
              name="billName"
              value={formData.billName}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Rainy Days"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            />
          </div>
          <div className="flex gap-[30px]">
            <div>
              <label
                htmlFor="frequency"
                className="block text-sm font-medium text-gray-700"
              >
                Frequency
              </label>
              <select
                className="p-2 border-gray-300 border-[2px] rounded-[8px]"
                name="frequency"
                id="frequency"
                value={formData.frequency}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select frequency
                </option>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                className="p-2 border-gray-300 border-[2px] rounded-[8px]"
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="due">Due</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
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
              name="dueDate"
              value={formData.dueDate}
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
              name="amount"
              value={formData.amount}
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
