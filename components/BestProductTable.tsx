import React from "react";

const BestProductTable = () => {
  const productDetails = [
    { name: "Product A", stock: 120, sales: 45, sku: "SKU001" },
    { name: "Product B", stock: 80, sales: 30, sku: "SKU002" },
    { name: "Product C", stock: 50, sales: 25, sku: "SKU003" },
    { name: "Product D", stock: 35, sales: 15, sku: "SKU004" },
    { name: "Product E", stock: 20, sales: 10, sku: "SKU005" },
  ];
  return (
    <div className="mt-10">
      <table className="min-w-full mt-4">
        <thead>
          <tr className="bg-gray-100 heading3 !text-base">
            <th className="px-4 py-2 text-left font-normal">Product Name</th>
            <th className="px-4 py-2 text-left font-normal">Stock Level</th>
            <th className="px-4 py-2 text-left font-normal">Sales</th>
            <th className="px-4 py-2 text-left font-normal">SKU</th>
          </tr>
        </thead>
        <tbody>
          {productDetails.map((product, index) => (
            <tr key={index} className="hover:bg-gray-50 border-b bodyText !text-text-2 last-of-type:border-b-0">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.stock}</td>
              <td className="px-4 py-2">{product.sales}</td>
              <td className="px-4 py-2">{product.sku}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BestProductTable;
