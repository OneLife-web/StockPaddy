"use client";
import { useContext } from "react";
import ThemeContext from "@/contexts/ThemeContext";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

const ThemeSwitch = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Switch
        id="theme-switch"
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
      />
      <Label htmlFor="theme-switch">
        {theme === "light" ? (
          <Moon strokeWidth={1.3} className="#C0C0C0" />
        ) : (
          <Sun strokeWidth={1.3} className="text-orange-400" />
        )}
      </Label>
    </div>
  );
};

export default ThemeSwitch;
