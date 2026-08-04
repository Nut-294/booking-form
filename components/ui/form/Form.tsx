"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldSet } from "@/components/ui/field";
import { Card, CardContent, CardHeader } from "../card";
import { bookingSchema, BookingType } from "@/utils/types";
import DatePicker from "./DatePicker";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

type FormProps = {
  defaultValues?: Partial<BookingType>;
};

export default function Form({ defaultValues }: FormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<BookingType>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      checkIn: undefined,
      checkOut: undefined,
      guests: 1,
      rooms: 1,
      ... defaultValues
    },
  });

  const checkIn = watch("checkIn");

  function onSubmit(values: BookingType) {
    const params = new URLSearchParams({
      checkIn: format(values.checkIn, "yyyy-MM-dd"),
      checkOut: format(values.checkOut, "yyyy-MM-dd"),
      guests: String(values.guests),
      rooms: String(values.rooms),
    });

    router.push(`/search?${params}`);
  }

  return (
    <Card>
      <CardHeader>ค้นหาห้องพัก</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <div className="grid grid-cols-5 gap-x-10">
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
              <FormInput
                label="Guests"
                name="guests"
                placeholder="Guests"
                errors={errors.guests}
                register={register}
              />

              {/* Rooms */}
              <FormInput
                label="Rooms"
                name="rooms"
                placeholder="Rooms"
                errors={errors.rooms}
                register={register}
              />
              <Button type="submit" className="mt-6.5">
                ค้นหา
              </Button>
            </div>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
