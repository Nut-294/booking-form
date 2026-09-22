"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import FormInput from "./FormInput";
import { useActionState } from "react";
import { createBooking } from "@/action";
import SubmitButton from "../button/SubmitButton";

function GuestForm({ checkIn, checkOut }: { checkIn: Date; checkOut: Date }) {
  const [message, formAction] = useActionState(createBooking, null);
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
