import { cn } from "@/lib/utils";
import { SingleProduct } from "@/types";
import { Trash2 } from "lucide-react";
import React from "react";

export function SalesProductListTable({
  products,
}: {
  products: SingleProduct[];
}) {
  return (
    <div className="overflow-auto">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100 h-[48px] rounded-tl-lg rounded-tr-lg">
          <tr className="heading3 lg:!text-base whitespace-nowrap">
            <th className="px-4 py-3 text-left font-normal rounded-tl-lg">
              Product
            </th>
            <th className="px-4 py-3 text-left font-normal">SKU</th>
            <th className="px-4 py-3 text-left font-normal">Qty</th>
            <th className="px-4 py-3 text-left font-normal">Unit Cost</th>
            <th className="px-4 py-3 text-left font-normal">Stock</th>
            <th className="px-4 py-3 text-left font-normal">Discount</th>
            <th className="px-4 py-3 text-left font-normal">Subtotal</th>
            <th className="px-4 py-3 text-left font-normal rounded-tr-lg">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <React.Fragment key={index}>
              {/* Main Row */}
              <tr
                className={`lg:hover:bg-zinc-50 border-b bodyText !text-text-2 last-of-type:border-b-0`}
              >
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.sku}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                {/* Updated */}
                <td className="px-4 py-3">{item.unitCost}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={cn(
                      "rounded-full text-center px-4 py-2 max-sm:text-xs",
                      {
                        "bg-[#F8BCBC] text-[#8B1A1A]":
                          item.stock <= item.lowStockThreshold,
                        "bg-[#BAF7BA] text-[#1B691B]":
                          item.stock > item.lowStockThreshold,
                      }
                    )}
                  >
                    {item.stock}
                  </span>
                </td>
                <td className="px-4 py-3">{item.discount}</td>
                <td className="px-4 py-3">subtotal</td>
                <td className="px-4 py-3">
                  <Trash2 strokeWidth={1.5} size={18} />
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
