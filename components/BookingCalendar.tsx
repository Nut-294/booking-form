"use client";
import { Calendar } from "@/components/ui/calendar";
import { useBookingStore } from "@/store/bookingStore";

function BookingCalendar() {
  const { range, setRange } = useBookingStore((state) => state);
  console.log("range", range);
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
