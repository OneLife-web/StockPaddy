"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BestProductChart = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const topSellingProducts = {
    series: [45, 30, 25, 15, 10], // Top 5 selling products (sales data)
    options: {
      chart: {
        type: "polarArea" as const,
      },
      labels: ["Product A", "Product B", "Product C", "Product D", "Product E"], // Product names
      fill: {
        opacity: 0.9,
      },
      stroke: {
        colors: ["#fff"],
      },
      colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"],
      yaxis: {
        show: false,
      },
      legend: {
        position: "bottom" as const,
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0,
          },
          spokes: {
            strokeWidth: 1,
          },
        },
      },
    },
  };

  return (
    <div>
      {isClient && (
        <Chart
          options={topSellingProducts.options}
          series={topSellingProducts.series}
          type="polarArea"
          height={350}
        />
      )}
    </div>
  );
};

export default BestProductChart;
