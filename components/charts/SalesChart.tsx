"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesChart = () => {
  const [isClient, setIsClient] = useState(false);
  const [dateRange, setDateRange] = useState<Date | undefined>(new Date());
  const [filter, setFilter] = useState<"week" | "month" | "year" | "compare">(
    "week"
  );
  const [chartData, setChartData] = useState<number[]>([]);
  const [chartKey, setChartKey] = useState(0); // Unique key to force re-render

  // Ensure this runs only on the client
  useEffect(() => {
    setIsClient(true);
    fetchChartData(filter); // Initial fetch
  }, []);

  useEffect(() => {
    fetchChartData(filter);
    setChartKey((prevKey) => prevKey + 1); // Increment key to force re-render
  }, [filter]);

  const fetchChartData = (filter: "week" | "month" | "year" | "compare") => {
    let data: number[] = [];
    switch (filter) {
      case "week":
        data = [0, 505, 414, 671, 227, 413, 201];
        break;
      case "month":
        data = Array.from({ length: 30 }, () =>
          Math.floor(Math.random() * 1000)
        );
        break;
      case "year":
        data = Array.from({ length: 12 }, () =>
          Math.floor(Math.random() * 5000)
        );
        break;
      case "compare":
        data = [4500, 5500, 6200, 7000, 7500, 8000];
        break;
    }
    setChartData(data);
  };

  const getXAxisCategories = () => {
    switch (filter) {
      case "week":
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      case "month":
        return Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
      case "year":
        return [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
      case "compare":
        return [
          "Jan-Feb",
          "Mar-Apr",
          "May-Jun",
          "Jul-Aug",
          "Sep-Oct",
          "Nov-Dec",
        ];
      default:
        return [];
    }
  };

  const chartOptions: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: { enabled: false },
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    colors: ["#fb923c"],
    dataLabels: { enabled: false },
    xaxis: {
      categories: getXAxisCategories(),
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value}`,
      },
    },
  };

  const handleFilterChange = (selectedFilter: typeof filter) => {
    setFilter(selectedFilter);
  };

  const handleDateChange = (date: Date | undefined) => {
    setDateRange(date);
    console.log("Selected Date:", date ? format(date, "yyyy-MM-dd") : "None");
  };

  return (
    <div className="space-y-4">
      <div className="p-4 hidden">
        <Calendar
          mode="single"
          selected={dateRange}
          onSelect={handleDateChange}
          className="border p-4 rounded-md"
        />
      </div>

      <div className="p-4">
        <select
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value as typeof filter)}
          className="p-2 border rounded-md"
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="compare">Compare Months</option>
        </select>
      </div>

      <div>
        {isClient && (
          <Chart
            key={chartKey} // Force re-render on key change
            options={chartOptions}
            series={[
              {
                name: "Sales",
                data: chartData, // Updated data
              },
            ]}
            type="line"
            height={350}
          />
        )}
      </div>
    </div>
  );
};

export default SalesChart;
