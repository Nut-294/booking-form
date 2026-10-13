import { differenceInCalendarDays } from "date-fns";

export function NightsCal(checkIn: Date, checkOut: Date) {
  return differenceInCalendarDays(checkOut, checkIn);
}
