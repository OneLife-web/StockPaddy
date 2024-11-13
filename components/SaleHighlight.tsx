"use client";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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
        type: "line",
        sparkline: { enabled: true },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      colors: ["#34c38f"],
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
        type: "bar",
        sparkline: { enabled: true },
      },
      colors: ["#556ee6"],
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
        type: "area",
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
    },
  };

  // Card Component
  const Card = ({ title, value, chartOptions, chartSeries }: any) => (
    <div className="bg-white myShadow rounded-lg p-4 flex flex-col">
      <h4 className="heading1">{value}</h4>
      <p className="bodyText">{title}</p>
      <div className="mt-4">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type={chartOptions.chart.type}
          height={50}
        />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card
        title="Profit"
        value="$500"
        chartOptions={profitData.options}
        chartSeries={profitData.series}
      />
      <Card
        title="Total Sales Amount"
        value="$2,300"
        chartOptions={totalSalesData.options}
        chartSeries={totalSalesData.series}
      />
      <Card
        title="Number of Sales"
        value="23"
        chartOptions={numOfSalesData.options}
        chartSeries={numOfSalesData.series}
      />
    </div>
  );
};

export default SaleHighlight;
