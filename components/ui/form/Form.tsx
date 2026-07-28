"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../input";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Card, CardContent, CardHeader } from "../card";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { format } from "date-fns";

const formSchema = z
  .object({
    guests: z.coerce.number().min(1, {
      message: "กรุณาเลือกจำนวนคน",
    }),

    rooms: z.coerce.number().min(1, {
      message: "กรุณาเลือกจำนวนห้องพัก",
    }),

    checkIn: z.date().optional(),

    checkOut: z.date().optional(),
  })

  // checkIn ต้องมีค่า
  .refine((data) => !!data.checkIn, {
    message: "กรุณาเลือกวันเข้าพัก",
    path: ["checkIn"],
  })

  // checkOut ต้องมีค่า
  .refine((data) => !!data.checkOut, {
    message: "กรุณาเลือกวันออก",
    path: ["checkOut"],
  })

  // checkOut ต้องมากกว่า checkIn
  .refine(
    (data) => {
      if (!data.checkIn || !data.checkOut) {
        return true;
      }

      return data.checkOut > data.checkIn;
    },
    {
      message: "วันออกต้องมากกว่าวันเข้า",
      path: ["checkOut"],
    },
  );

export default function Form() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guests: 1,
      rooms: 1,
      checkIn: undefined,
      checkOut: undefined,
    },
  });

  const checkIn = watch("checkIn");

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Card>
      <CardHeader>ค้นหาห้องพัก</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <div className="grid grid-cols-4 gap-x-10">
              {/* Check In */}
              <Field>
                <FieldLabel>Check In</FieldLabel>
                <Controller
                  control={control}
                  name="checkIn"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger
                        render={
                          <Button variant="outline" className="w-full">
                            {field.value
                              ? format(field.value, "dd / MM / yyyy")
                              : "กรุณาเลือกวันเข้าพัก"}
                          </Button>
                        }
                      />

                      <PopoverContent
                        align="center"
                        sideOffset={10}
                        className="w-auto"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                <FieldError errors={[errors.checkIn]} />
              </Field>

              {/* Check Out */}
              <Field>
                <FieldLabel>Check Out</FieldLabel>
                <Controller
                  control={control}
                  name="checkOut"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger
                        render={
                          <Button variant="outline" className="w-full">
                            {field.value
                              ? format(field.value, "dd / MM / yyyy")
                              : "กรุณาเลือกวันออก"}
                          </Button>
                        }
                      />

                      <PopoverContent
                        align="center"
                        sideOffset={10}
                        className="w-auto"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            if (!checkIn) {
                              return false;
                            }
                            return date <= checkIn;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                <FieldError errors={[errors.checkOut]} />
              </Field>

              {/* Guests */}
              <Field>
                <FieldLabel htmlFor="guests">Guests</FieldLabel>
                <Input
                  id="guests"
                  type="number"
                  min={1}
                  placeholder="Guest"
                  {...register("guests")}
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
                  {...register("rooms")}
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
