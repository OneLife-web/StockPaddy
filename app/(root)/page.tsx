"use client";
import { DatePickerWithRange } from "@/components/DatePicker";
import PolarAreaChart from "@/components/PolarAreaChart";
import SalesLineChart from "@/components/SalesLineChart";
import { SwitchDemo } from "@/components/Switch";
import ThemeContext from "@/contexts/ThemeContext";
import { useSession } from "next-auth/react";
import { useContext } from "react";

const HomePage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { data: session } = useSession();
  const weeklyData = [
    { label: "Mon", value: 1000 },
    { label: "Tue", value: 1500 },
    { label: "Wed", value: 1200 },
    { label: "Thu", value: 1800 },
    { label: "Fri", value: 2000 },
    { label: "Sat", value: 2200 },
    { label: "Sun", value: 1900 },
  ];

  return (
    <div>
      <header className="header">
        <SwitchDemo />
        <button onClick={toggleTheme} className="p-2 rounded">
          {theme === "light"
            ? "🌙 Switch to Dark Mode"
            : "☀️ Switch to Light Mode"}
        </button>
      </header>
      <h2 className="">Home {session?.user?.name}</h2>
      <DatePickerWithRange />
      <PolarAreaChart />
      <SalesLineChart data={weeklyData} timeFrame="week" />
    </div>
  );
};

export default HomePage;
