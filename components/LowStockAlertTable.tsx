import React from "react";

const LowStockAlertTable = () => {
  const productDetails = [
    { name: "Product A", stock: 10, reorderThreshold: 25, sku: "SKU001" },
    { name: "Product B", stock: 20, reorderThreshold: 30, sku: "SKU002" },
    { name: "Product C", stock: 8, reorderThreshold: 25, sku: "SKU003" },
    { name: "Product D", stock: 5, reorderThreshold: 20, sku: "SKU004" },
    { name: "Product E", stock: 15, reorderThreshold: 20, sku: "SKU005" },
  ];
  return (
    <div className="mt-4 max-xs:px-[1%] px-3">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100 rounded-full">
          <tr className="heading3 lg:!text-base">
            <th className="max-xs:pr-3 px-4 py-3 text-left font-normal rounded-l-full">
              Product Name
            </th>
            <th className="max-xs:px-3 px-4 py-3 text-left font-normal">Current Stock</th>
            <th className="max-xs:px-2 px-4 py-3 text-left font-normal">
              Low Stock Threshold
            </th>
            <th className="max-xs:px-3 px-4 py-3 text-left font-normal rounded-r-full">
              SKU
            </th>
          </tr>
        </thead>
        <tbody>
          {productDetails.map((product, index) => (
            <tr
              key={index}
              className="hover:bg-zinc-50 border-b bodyText !text-text-2 last-of-type:border-b-0"
            >
              <td className="px-4 py-3">{product.name}</td>
              <td className="max-xs:px-3 px-4 py-3">{product.stock}</td>
              <td className="max-xs:px-2 px-4 py-3 !text-red-500">
                {product.reorderThreshold}
              </td>
              <td className="max-xs:px-3 px-4 py-3">{product.sku}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LowStockAlertTable;
