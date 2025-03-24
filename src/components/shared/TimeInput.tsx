"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/ui/time-picker-input";

interface TimePickerDemoProps {
   date: Date | undefined;
   setDate: (date: Date | undefined) => void;
}

const TimePicker = ({ date, setDate }: TimePickerDemoProps) => {
   const handleTimeChange = (value: any, picker: "hours" | "minutes") => {
      if (!date) return;
      const newDate = new Date(date);
      if (picker === "hours") newDate.setHours(value);
      if (picker === "minutes") newDate.setMinutes(value);
      setDate(newDate);
   };
   const minuteRef = React.useRef<HTMLInputElement>(null);
   const hourRef = React.useRef<HTMLInputElement>(null);

   return (
      <div className="flex items-end gap-2">
         <div className="grid gap-1 text-center">
            <Label htmlFor="hours" className="text-xs">
               Hours
            </Label>
            <TimePickerInput
               picker="hours"
               date={date}
               setDate={(value) => handleTimeChange(value, "hours")}
               ref={hourRef}
               onRightFocus={() => minuteRef.current?.focus()}
            />
         </div>
         <div className="grid gap-1 text-center">
            <Label htmlFor="minutes" className="text-xs">
               Minutes
            </Label>
            <TimePickerInput
               picker="minutes"
               date={date}
               setDate={(value) => handleTimeChange(value, "minutes")}
               ref={minuteRef}
               onLeftFocus={() => hourRef.current?.focus()}
            />
         </div>
         <div className="flex h-10 items-center">
            <Clock className="ml-2 h-4 w-4" />
         </div>
      </div>
   );
}
export default TimePicker;