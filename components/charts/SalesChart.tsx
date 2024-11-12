"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamically import the ApexCharts component
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesChart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure the code runs only on the client side
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      id: "sales-chart",
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    title: {
      text: "Monthly Sales",
      align: "center",
    },
  };

  const chartData = [
    {
      name: "Sales",
      data: [1500, 2000, 3000, 5000, 4000, 6000],
    },
  ];

  return (
    <div>
      <h1>Sales Dashboard</h1>
      {isClient && (
        <Chart
          options={chartOptions}
          series={chartData}
          type="line"
          height={350}
        />
      )}
    </div>
  );
};

export default SalesChart;
