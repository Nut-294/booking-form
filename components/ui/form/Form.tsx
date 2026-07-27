"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../input";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Card, CardContent, CardHeader } from "../card";
import { Button } from "../button";;

const formSchema = z.object({
  guests: z.coerce.number().min(1, { message: "กรุณาเลือกจำนวนคน" }),
  rooms: z.coerce.number().min(1, { message: "กรุณาเลือกจำนวนห้องพัก" }),
});

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guests: 1,
      rooms: 1,
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data.guests,data.rooms);
  }
  return (
    <Card>
      <CardHeader>ค้นหาห้องพัก</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <div className="grid grid-cols-4 gap-x-10">
              {/* CheckIn */}
              {/* CheckOut */}
              <Field>
                <FieldLabel htmlFor="guests">Guests</FieldLabel>
                <Input
                  id="guests"
                  type="number"
                  min={1}
                  placeholder="Guest"
                  {...register("guests")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="rooms">Rooms</FieldLabel>
                <Input
                  id="rooms"
                  type="number"
                  min={1}
                  placeholder="Room"
                  {...register("rooms")}
                />
              </Field>
            </div>
            <Field orientation={"horizontal"}>
              <Button type="submit">ค้นหา</Button>
            </Field>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
