"use server";
import { prisma } from "./lib/prisma";
import { bookingSchema } from "./schemas/bookingSchema";
import { validateWithZodSchema } from "./schemas/validateWithZodSchema";
import { NightsCal } from "./utils/NightsCal";

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

//ราคาห้อง
export const roomTotalPrice = async (
  idArray: string[],
  checkIn: Date,
  checkOut: Date,
): Promise<number> => {
  try {
    const prices = await prisma.room.findMany({
      where: {
        id: {
          in: idArray,
        },
      },
      include: {
        roomType: {
          select: {
            price: true,
          },
        },
      },
    });

    //คำนวนราคาห้อง
    const totalRoomPrice = prices.reduce(
      (total, price) => total + price.roomType.price,
      0,
    );
    const nights = NightsCal(checkIn, checkOut);
    const totalPrice = totalRoomPrice * nights;
    return totalPrice;
  } catch (error) {
    console.error("Failed to calculate room total price:", error);
    //ส่ง error ให้ผู้เรียกใช้
    throw new Error("Something RoomPrice was Wrong");
  }
};

//เช็ค id ว่า มีในระบบจริงๆไหม
export const fetchRoomId = async (idArray: string[]) => {
  const room = await prisma.room.findMany({
    where: {
      id: {
        in: idArray,
      },
    },
  });
  if (room.length === 0) {
    throw new Error("Room Not Found");
  }
  return room;
};

export const createBooking = async (prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validateWithZod = validateWithZodSchema(bookingSchema, rawData);
  const { firstName, lastName, email, phone, checkIn, checkOut, roomIds } =
    validateWithZod;
  const idArray = roomIds.split(",");

  try {
    //เช็ควันที่
    if (checkIn >= checkOut) {
      return {
        success: false,
        message: "วันออกต้องอยู่หลังวันเข้าพัก",
      };
    }

    //เช็คว่าห้องมีอยุ่จริงไหม
    const rooms = await prisma.room.findMany({
      where: {
        id: {
          in: idArray,
        },
        status: "AVAILABLE",
        bookings: {
          none: {
            booking: {
              status: {
                not: "CANCELLED",
              },
              checkIn: {
                lt: checkIn,
              },
              checkOut: {
                gt: checkIn,
              },
            },
          },
        },
      },
    });

    if (rooms.length !== idArray.length) {
      return {
        success: false,
        message: "ห้องพักไม่ว่าง",
      };
    }

    //คำนวนราคา
    const totalPrice = await roomTotalPrice(idArray, checkIn, checkOut);

    //บันทึกการจอง
    const bookingRooms = idArray.map((roomId) => ({
      room: {
        connect: {
          id: roomId,
        },
      },
    }));

    await prisma.booking.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        checkIn,
        checkOut,
        totalPrice,
        rooms: {
          create: bookingRooms,
        },
      },
    });

    return {
      success: true,
      message: "Booking created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to Create Booking",
    };
  }
};
