"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import FormInput from "./FormInput";

function GuestForm({
  checkIn,
  checkOut,
}: {
  checkIn: string;
  checkOut: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="underline decoration-2 text-xl">
          รายละเอียดผู้จอง
        </CardTitle>
      </CardHeader>
      <CardContent className="leading-6 px-8">
        <FormInput
          name="firstname"
          type="text"
          label="ชื่อจริง"
          placeholder="กรอกชื่อจริงผู้จอง"
        />
        <FormInput
          name="lastname"
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
      </CardContent>
    </Card>
  );
}
export default GuestForm;
