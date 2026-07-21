"use client";
import { useBookingStore } from "@/store/bookingStore";
import { Card, CardTitle } from "./ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import { calTotal } from "@/utils/bookingCal";

function BookingForm() {
  const range = useBookingStore((state) => state.range);
  const price = useBookingStore((state) => state.price);

  if (!range?.from || !range?.to) return null;

  const result = calTotal(price, range.from, range.to);

  return (
    <Card className="my-2 p-8">
      <CardTitle>สรุป</CardTitle>
      <p className="flex justify-between">
        <span>{`฿${price} × ${result.totalNights} คืน`}</span>
        <span>{formatCurrency(result.total)}</span>
      </p>
    </Card>
  );
}

export default BookingForm;
