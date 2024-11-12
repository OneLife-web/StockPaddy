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
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    stroke: {
      width: [0, 4],
      curve: "smooth",
    },
    title: {
      text: "Traffic Sources",
      align: "center",
    },
    dataLabels: {
      enabled: false,
    },
    labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    yaxis: [
      {},
      {
        opposite: true,
        labels: {
          show: false,
        },
      },
    ],
  };

  const chartData = [
    {
      name: "Website Blog",
      type: "column",
      data: [440, 505, 414, 671, 227, 413, 201],
    },
    {
      name: "Social Media",
      type: "line",
      data: [0, 505, 414, 671, 227, 413, 201],
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
