import { z } from "zod";

export const bookingSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.email(),
  phone: z.string(),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
