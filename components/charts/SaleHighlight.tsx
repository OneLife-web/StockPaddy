"use client";
import { CardProps } from "@/types";
import dynamic from "next/dynamic";
import { ChartSkeleton } from "../skeletons/ChartSkeleton";
import CountUp from "react-countup";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

const SaleHighlight = () => {
  // Data for sparklines
  const profitData = {
    series: [
      {
        name: "Profit",
        data: [10, 40, 25, 50, 30, 70, 80], // Example hourly profit data
      },
    ],
    options: {
      chart: {
        type: "line" as const,
        sparkline: { enabled: true },
      },
      stroke: {
        curve: "smooth" as const,
        width: 2,
      },
      colors: ["#34c38f"],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "10px",
          colors: ["#34c38f"],
        },
        offsetY: -10, // Position topmost
      },
    },
  };
  
  const totalSalesData = {
    series: [
      {
        name: "Total Sales",
        data: [300, 400, 350, 500, 450, 600, 700], // Example hourly sales data
      },
    ],
    options: {
      chart: {
        type: "bar" as const,
        sparkline: { enabled: true },
      },
      colors: ["#556ee6"],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "10px",
          colors: ["#556ee6"],
        },
        offsetY: -10, // Adjust for bar height
      },
    },
  };
  
  const numOfSalesData = {
    series: [
      {
        name: "Number of Sales",
        data: [3, 5, 2, 8, 7, 6, 10], // Example hourly sales counts
      },
    ],
    options: {
      chart: {
        type: "area" as const,
        sparkline: { enabled: true },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.6,
          opacityTo: 0.1,
        },
      },
      colors: ["#f46a6a"],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "10px",
          colors: ["#f46a6a"],
        },
        offsetY: -10, // Position for area chart
      },
    },
  };  

  // Card Component
  const Card: React.FC<CardProps> = ({
    title,
    value,
    chartOptions,
    chartSeries,
  }) => (
    <div className="myCard p-4 flex flex-col min-h-[150px]">
      <h4 className="heading1">
        <CountUp
          end={value}
          duration={1.5}
          formattingFn={(num) =>
            title === "Profit"
              ? `$${new Intl.NumberFormat().format(num)}`
              : title === "Total Sales Amount"
              ? `$${new Intl.NumberFormat().format(num)}`
              : new Intl.NumberFormat().format(num)
          }
        />
      </h4>
      <p className="bodyText">{title}</p>
      <div className="mt-4">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type={chartOptions.chart?.type as "line" | "bar" | "area"} // Type assertion for chart type
          height={50}
        />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card
        title="Profit"
        value={500}
        chartOptions={profitData.options}
        chartSeries={profitData.series}
      />
      <Card
        title="Total Sales Amount"
        value={2300}
        chartOptions={totalSalesData.options}
        chartSeries={totalSalesData.series}
      />
      <Card
        title="Number of Sales"
        value={23}
        chartOptions={numOfSalesData.options}
        chartSeries={numOfSalesData.series}
      />
    </div>
  );
};

export default SaleHighlight;
