import { z } from "zod";

export const bookingSchema = z
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

export type BookingType = z.infer<typeof bookingSchema>