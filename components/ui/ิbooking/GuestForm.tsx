"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import FormInput from "./FormInput";
import { useActionState, useEffect } from "react";
import { createBooking } from "@/action";
import SubmitButton from "../button/SubmitButton";
import { toast } from "sonner";

const initialState = {
  success: false,
  message: "",
};

function GuestForm({ checkIn, checkOut }: { checkIn: Date; checkOut: Date }) {
  const [state, formAction] = useActionState(createBooking, initialState);

  useEffect(() => {
    if (state.message === "") {
      return;
    }
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="underline decoration-2 text-xl">
          รายละเอียดผู้จอง
        </CardTitle>
      </CardHeader>
      <CardContent className="leading-6 px-8">
        <form action={formAction}>
          <FormInput name="firstName" type="text" label="ชื่อจริง" />
          <FormInput name="lastName" type="text" label="นามสกุล" />
          <FormInput name="email" type="email" label="อีเมล" />
          <FormInput name="phone" type="tel" label="เบอร์โทร" />
          <input type="hidden" name="checkIn" value={checkIn.toString()} />
          <input type="hidden" name="checkOut" value={checkOut.toString()} />
          <SubmitButton btnStyle="mt-4 bg-green-500 hover:bg-green-600 cursor-pointer" />
        </form>
      </CardContent>
    </Card>
  );
}
export default GuestForm;
