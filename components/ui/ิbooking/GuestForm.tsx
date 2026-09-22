import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import FormInput from "./FormInput";
import { useActionState } from "react";
import { createBooking } from "@/action";
import { toast } from "@/components/ui/toast"

const initialState = {
  success: false,
  message: "",
};

function GuestForm() {
  const [state, formAction] = useActionState(createBooking, initialState);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="underline decoration-2 text-xl">
          รายละเอียดผู้จอง
        </CardTitle>
      </CardHeader>
      <CardContent className="leading-6 px-8">
        <form action={formAction}>
          <FormInput name="firstname" type="text" label="ชื่อจริง" />
          <FormInput name="lastname" type="text" label="นามสกุล" />
          <FormInput name="email" type="email" label="อีเมล" />
          <FormInput name="phone" type="tel" label="เบอร์โทร" />
          <Button className="mt-4 bg-green-500 hover:bg-green-600 cursor-pointer">
            Booking
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
export default GuestForm;
