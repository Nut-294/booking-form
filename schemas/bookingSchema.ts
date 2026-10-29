import { z } from "zod";

export const bookingSchema = z.object({
  firstName: z.string().min(1,"กรูณาใส่ชื่อ"),
  lastName: z.string().min(1,"กรูณาใส่นามสกุล"),
  email: z.email("กรุณากรอกอีเมลให้ถูกต้อง"),
  phone: z.string().min(10,"กรุณากรอกเบอร์โทรศัพท์"),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
  roomIds: z.string().min(1,"มีข้อผิดพลาดเกี่ยวกับการจองห้อง"),
});

export type BookingInput = z.infer<typeof bookingSchema>;
