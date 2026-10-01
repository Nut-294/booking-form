"use client";
import { createBooking } from "@/action";
import { useActionState, useEffect } from "react";
import SubmitButton from "../button/SubmitButton";
import { toast } from "sonner";
import GuestForm from "./GuestForm";
import BookingSummary from "./BookingSummary";

const initialState = {
  success: false,
  message: "",
};
function BookingForm({ checkIn, checkOut }: { checkIn: Date; checkOut: Date }) {
  const [state, formAction] = useActionState(createBooking, initialState);
  console.log(checkIn, checkOut);

  useEffect(() => {
    if (!state.message) {
      return;
    }
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <GuestForm checkIn={checkIn} checkOut={checkOut} />
      <BookingSummary />
      <SubmitButton btnStyle="mt-4 bg-green-500 hover:bg-green-600 cursor-pointer" />
    </form>
  );
}
export default BookingForm;
