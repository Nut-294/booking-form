"use server";
import { prisma } from "./lib/prisma";
import { bookingSchema } from "./schemas/bookingSchema";
import { validateWithZodSchema } from "./schemas/validateWithZodSchema";

//หาห้องที่ว่าง
export const getAvailableRooms = async ({
  checkIn,
  checkOut,
  guests,
  rooms,
}: {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  rooms: number;
}) => {
  try {
    const availableRooms = await prisma.room.findMany({
      where: {
        status: "AVAILABLE",
      },
      include: {
        roomType: true,
      },
      // ถ้าจองเท่ากัน oldCheckIn < newCheckOut && oldCheckOut > newCheckIn
      // bookings: {
      //   none: {
      //     booking: {
      //       checkIn: {
      //         lt: checkOut,
      //       },
      //       checkOut: {
      //         gt: checkIn,
      //       },
      //     },
      //   },
      // },
    });
    // console.log("ก่อนหาวันที่",availableRooms);
    return availableRooms;
  } catch (error) {
    console.log("Error", error);
    return [];
  }
};

//ดู Detail
export const getRoomDetail = async (id: string) => {
  try {
    const room = await prisma.room.findFirst({
      where: {
        id: id,
      },
      include: {
        roomType: true,
      },
    });
    return room;
  } catch (error) {
    console.log("Error", error);
  }
};

//Booking
export const createBooking = async (prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validateWithZod = validateWithZodSchema(bookingSchema, rawData);
  const { firstname, lastname, email, phone, checkIn, checkOut } =
    validateWithZod;

  try {
    await prisma.booking.create({
      data: {
        firstName: firstname,
        lastName: lastname,
        email,
        phone,
        checkIn,
        checkOut,
      },
    });
    return {
      success: true,
      message: "Booking created successfully",
    };
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Failed to create booking",
    };
  }
};
