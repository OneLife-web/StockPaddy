"use client";
import React, { useState } from "react";

const RecentSalesTable = () => {
  const recentSales = [
    {
      date: "2024-11-12 14:30",
      transactionId: "TXN001",
      attendedBy: "Alice Johnson", // Updated to track who attended the customer
      totalAmount: "$150",
      paymentStatus: "Paid",
      products: [
        { name: "Product A", quantity: 2, price: "$50" },
        { name: "Product B", quantity: 1, price: "$100" },
      ],
    },
    {
      date: "2024-11-12 13:00",
      transactionId: "TXN002",
      attendedBy: "Bob Smith", // Another admin/person
      totalAmount: "$80",
      paymentStatus: "Pending",
      products: [{ name: "Product C", quantity: 3, price: "$80" }],
    },
    {
      date: "2024-11-12 12:45",
      transactionId: "TXN003",
      attendedBy: "Charlie Brown", // Another admin/person
      totalAmount: "$200",
      paymentStatus: "Paid",
      products: [{ name: "Product D", quantity: 1, price: "$200" }],
    },
  ];

  // State to track expanded rows
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  // Toggle expanded state for rows
  const toggleExpandRow = (index: number) => {
    setExpandedRows(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // Collapse if already expanded
          : [...prev, index] // Expand otherwise
    );
  };

  return (
    <div className="mt-4 px-3 overflow-x-scroll custom-scrollbar">
      <table className="min-w-full border-collapse">
        <thead className="bg-zinc-50 rounded-full">
          <tr className="heading3 lg:!text-base">
            <th className="px-4 py-3 text-left font-normal rounded-l-full">
              Date/Time
            </th>
            <th className="px-4 py-3 text-left font-normal">Transaction ID</th>
            <th className="px-4 py-3 text-left font-normal">Attended By</th>
            <th className="px-4 py-3 text-left font-normal">Total Amount</th>
            <th className="px-4 py-3 text-left font-normal">Payment Status</th>
            <th className="px-4 py-3 text-left font-normal rounded-r-full">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {recentSales.map((sale, index) => (
            <React.Fragment key={index}>
              {/* Main Row */}
              <tr
                className={`hover:bg-zinc-50 border-b bodyText !text-text-2 last-of-type:border-b-0`}
              >
                <td className="px-4 py-3">{sale.date}</td>
                <td className="px-4 py-3">{sale.transactionId}</td>
                <td className="px-4 py-3">{sale.attendedBy}</td> {/* Updated */}
                <td className="px-4 py-3">{sale.totalAmount}</td>
                <td className="px-4 py-3">{sale.paymentStatus}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleExpandRow(index)}
                    className="text-blue-500 hover:underline"
                  >
                    {expandedRows.includes(index)
                      ? "Hide Details"
                      : "View Details"}
                  </button>
                </td>
              </tr>

              {/* Expanded Row for Products */}
              {expandedRows.includes(index) && (
                <tr className="bodyText !text-text-2 last-of-type:border-b-0">
                  <td colSpan={6} className="px-4 py-3">
                    <h3 className="heading3">Products Sold:</h3>
                    <ul className="list-disc pl-5">
                      {sale.products.map((product, idx) => (
                        <li key={idx}>
                          <span className="heading3">{product.name}</span>{" "}
                          - {product.quantity} unit(s) at <span className="font-clashmd">{product.price}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentSalesTable;
