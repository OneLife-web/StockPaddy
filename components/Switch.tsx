"use client";
import { useContext } from "react";
import ThemeContext from "@/contexts/ThemeContext";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-switch"
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
      />
      <Label htmlFor="theme-switch">{theme === "light" ? "🌙" : "☀️"}</Label>
    </div>
  );
};

export default ThemeSwitch;
