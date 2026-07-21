import { type DateRange } from "react-day-picker";
import { create } from "zustand";

type BookingState = {
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
  price: number;
};

export const useBookingStore = create<BookingState>((set) => ({
  range: undefined,
  setRange: (range) => set({ range: range }),
  price: 100,
}));
