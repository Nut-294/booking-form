import { z } from "zod";

export const bookingSchema = z
  .object({
    checkIn: z.date(),
    checkOut: z.date(),
    guests: z.number().min(1, {
      message: "กรุณาเลือกจำนวนคน",
    }),
    rooms: z.number().min(1, {
      message: "กรุณาเลือกจำนวนห้องพัก",
    }),
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

export type BookingType = z.infer<typeof bookingSchema>;
