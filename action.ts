"use server";
import { prisma } from "./lib/prisma";

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
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const checkIn = new Date(formData.get("checkIn") as string);
  const checkOut = new Date(formData.get("checkOut") as string);
  console.log("firstName", firstName);
  console.log("lastName", lastName);
  console.log("email", email);
  console.log("phone", phone);
  console.log("checkIn", checkIn);
  console.log("checkOut", checkOut);

  try {
    await prisma.booking.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        checkIn,
        checkOut,
      },
    });
    return {
      success: true,
      message: "Booking success",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something was wrong when booking",
    };
  }
};
