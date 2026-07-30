"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../input";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Card, CardContent, CardHeader } from "../card";
import { Button } from "../button";
import { bookingSchema, BookingType } from "@/utils/types";
import DatePicker from "./DatePicker";
import { useForm } from "react-hook-form";

export default function Form() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: 1,
      rooms: 1,
      checkIn: undefined,
      checkOut: undefined,
    },
  });

  const checkIn = watch("checkIn");

  function onSubmit(values: BookingType) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>ค้นหาห้องพัก</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <div className="grid grid-cols-4 gap-x-10">
              {/* Check In */}
              <DatePicker
                control={control}
                errors={errors.checkIn}
                name="checkIn"
                label="Check In"
                placeholder="กรุณาเลือกวันเข้าพัก"
              />

              {/* Check Out */}
              <DatePicker
                control={control}
                errors={errors.checkOut}
                name="checkOut"
                label="Check Out"
                placeholder="กรุณาเลือกวันออก"
                disabled={(date) => {
                  if (!checkIn) return false;
                  return date <= checkIn;
                }}
              />

              {/* Guests */}
              <Field>
                <FieldLabel htmlFor="guests">Guests</FieldLabel>
                <Input
                  id="guests"
                  type="number"
                  min={1}
                  placeholder="Guest"
                  {...register("guests", {
                    valueAsNumber: true,
                  })}
                />
                <FieldError errors={[errors.guests]} />
              </Field>

              {/* Rooms */}
              <Field>
                <FieldLabel htmlFor="rooms">Rooms</FieldLabel>
                <Input
                  id="rooms"
                  type="number"
                  min={1}
                  placeholder="Room"
                    {...register("rooms", {
                    valueAsNumber: true,
                  })}
                />
                <FieldError errors={[errors.rooms]} />
              </Field>
            </div>

            <Field orientation="horizontal">
              <Button type="submit">ค้นหา</Button>
            </Field>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
