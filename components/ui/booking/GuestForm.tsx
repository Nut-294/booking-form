"use client";
import { useActionState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import FormInput from "./FormInput";
import { createBooking } from "@/action";

import { toast } from "sonner";
import { Button } from "../button";

const initialState = {
  success: false,
  message: "",
};

function GuestForm({
  checkIn,
  checkOut,
  roomIds,
}: {
  checkIn: string;
  checkOut: string;
  roomIds: string[];
}) {
  const [state, formAction] = useActionState(createBooking, initialState);
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
      <Card>
        <CardHeader>
          <CardTitle className="underline decoration-2 text-xl">
            Guest Information
          </CardTitle>
        </CardHeader>
        <CardContent className="leading-6 px-8">
          <FormInput
            name="firstName"
            type="text"
            label="ชื่อจริง"
            placeholder="กรอกชื่อจริงผู้จอง"
          />
          <FormInput
            name="lastName"
            type="text"
            label="นามสกุล"
            placeholder="กรอกนามสกุลผู้จอง"
          />
          <FormInput
            name="email"
            type="email"
            label="อีเมล"
            placeholder="example@email.com"
          />
          <FormInput
            name="phone"
            type="tel"
            label="เบอร์โทร"
            placeholder="08x-xxx-xxxx"
          />
          <input type="hidden" name="checkIn" value={checkIn} />
          <input type="hidden" name="checkOut" value={checkOut} />
          <input type="hidden" name="roomIds" value={roomIds} />
        </CardContent>
        <Button type="submit" className="cursor-pointer bg-green-400 mx-auto">
          Booking
        </Button>
      </Card>
    </form>
  );
}
export default GuestForm;
