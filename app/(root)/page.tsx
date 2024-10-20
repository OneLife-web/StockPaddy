"use client";
import { DatePickerWithRange } from "@/components/DatePicker";
import ThemeContext from "@/contexts/ThemeContext";
import { useSession } from "next-auth/react";
import { useContext } from "react";

const HomePage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { data: session } = useSession();
  return (
    <div>
      <header className="header">
        <button onClick={toggleTheme} className="p-2 rounded">
          {theme === "light"
            ? "🌙 Switch to Dark Mode"
            : "☀️ Switch to Light Mode"}
        </button>
      </header>
      <h2 className="">Home {session?.user?.name}</h2>
      <DatePickerWithRange />
    </div>
  );
};

export default HomePage;
