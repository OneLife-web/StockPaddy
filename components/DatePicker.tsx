"use client";
import * as React from "react";
import { format, startOfMonth, subMonths } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { presets } from "@/app/constants";

const DatePicker = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfMonth(subMonths(new Date(), 1)), // first day of last month
    to: new Date(), // current day
  });

  // Function to handle preset selection
  const handlePreset = (preset: keyof typeof presets) => {
    setDate(presets[preset]);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex gap-4" align="start">
          {/* Preset Buttons aligned vertically */}
          <div className="flex flex-col space-y-2 p-4 border-r">
            <Button variant="outline" onClick={() => handlePreset("today")}>
              Today
            </Button>
            <Button variant="outline" onClick={() => handlePreset("yesterday")}>
              Yesterday
            </Button>
            <Button variant="outline" onClick={() => handlePreset("thisWeek")}>
              This Week
            </Button>
            <Button variant="outline" onClick={() => handlePreset("thisMonth")}>
              This Month
            </Button>
          </div>

          {/* Calendar Component */}
          <div className="p-4">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
