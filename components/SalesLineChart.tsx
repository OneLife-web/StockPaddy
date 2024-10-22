"use client";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SalesData {
  label: string;
  value: number;
}

interface SalesLineChartProps {
  data: SalesData[];
  timeFrame: "week" | "month" | "year";
}

const SalesLineChart: React.FC<SalesLineChartProps> = ({ data, timeFrame }) => {
  // Memoize chartData to avoid recalculation on each render
  const chartData = useMemo(
    () => ({
      labels: data.map((item) => item.label),
      datasets: [
        {
          label: `Sales (${timeFrame})`,
          data: data.map((item) => item.value),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          tension: 0.1,
        },
      ],
    }),
    [data, timeFrame]
  ); // Dependencies for re-computation

  // Memoize options for the chart
  const options: ChartOptions<"line"> = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: `Sales Analysis (${timeFrame})`,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(context.parsed.y);
              }
              return label;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Sales ($)",
          },
        },
      },
    }),
    [timeFrame]
  ); // Recalculate options only when timeFrame changes

  return (
    <div className="lg:w-[80vw]">
      <h2 className="text-xl font-bold mb-4">Sales Analysis</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesLineChart;
