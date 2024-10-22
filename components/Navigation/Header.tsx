"use client";
import { SwitchDemo } from "@/components/Switch";
import ThemeContext from "@/contexts/ThemeContext";
import { useContext } from "react";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="header">
      <SwitchDemo />
      <button onClick={toggleTheme} className="p-2 rounded">
        {theme === "light"
          ? "🌙 Switch to Dark Mode"
          : "☀️ Switch to Light Mode"}
      </button>
    </header>
  );
};

export default Header;
