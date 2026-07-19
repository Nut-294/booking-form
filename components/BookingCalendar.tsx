"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";
import { type DateRange } from "react-day-picker";

const defaultSelected = {
  from: undefined,
  to: undefined,
};

function BookingCalendar() {
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  console.log(range);
  return (
    <>
      <Calendar
        mode="range" //mode singel เลือกวันเดียว
        selected={range}
        onSelect={setRange}
        // disabled = {range} ทำการบล็อกวันที่
        className="rounded-lg border"
      />
    </>
  );
}
export default BookingCalendar;
