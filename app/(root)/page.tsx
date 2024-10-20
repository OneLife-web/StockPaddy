"use client";
import ThemeContext from "@/contexts/ThemeContext";
import { useContext } from "react";

const HomePage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <header className="header">
        <button onClick={toggleTheme} className="p-2 rounded">
          {theme === "light"
            ? "🌙 Switch to Dark Mode"
            : "☀️ Switch to Light Mode"}
        </button>
      </header>
      <h2 className="">Home</h2>
    </div>
  );
};

export default HomePage;
