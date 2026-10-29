import { differenceInCalendarDays } from "date-fns";

export function NightsCal(checkIn: Date, checkOut: Date):number {
  return differenceInCalendarDays(checkOut, checkIn);
}
