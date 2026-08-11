


import React from "react";

const SupplierDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Supplier Dashboard</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-2xl font-bold">120</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">Orders</h2>
          <p className="text-2xl font-bold">75</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-2xl font-bold">$5,400</p>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-2">#1001</td>
              <td>Ali</td>
              <td className="text-green-500">Completed</td>
              <td>$120</td>
            </tr>

            <tr className="border-b">
              <td className="py-2">#1002</td>
              <td>Reza</td>
              <td className="text-yellow-500">Pending</td>
              <td>$80</td>
            </tr>

            <tr>
              <td className="py-2">#1003</td>
              <td>Sara</td>
              <td className="text-red-500">Cancelled</td>
              <td>$50</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default SupplierDashboard;