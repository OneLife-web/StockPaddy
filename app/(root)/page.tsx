"use client";
import { DatePickerWithRange } from "@/components/DatePicker";
import PolarAreaChart from "@/components/PolarAreaChart";
import { SwitchDemo } from "@/components/Switch";
import ThemeContext from "@/contexts/ThemeContext";
import { useSession } from "next-auth/react";
import { useContext } from "react";

const HomePage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { data: session } = useSession();
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
    </div>
  );
};

export default HomePage;
