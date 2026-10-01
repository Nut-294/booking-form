"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import FormInput from "./FormInput";

function GuestForm({ checkIn, checkOut }: { checkIn: Date; checkOut: Date }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="underline decoration-2 text-xl">
          รายละเอียดผู้จอง
        </CardTitle>
      </CardHeader>
      <CardContent className="leading-6 px-8">
        <FormInput name="firstname" type="text" label="ชื่อจริง" />
        <FormInput name="lastname" type="text" label="นามสกุล" />
        <FormInput name="email" type="email" label="อีเมล" />
        <FormInput name="phone" type="tel" label="เบอร์โทร" />
        <input type="hidden" name="checkIn" value={checkIn.toISOString()} />
        <input type="hidden" name="checkOut" value={checkOut.toISOString()} />
      </CardContent>
    </Card>
  );
}
export default GuestForm;
