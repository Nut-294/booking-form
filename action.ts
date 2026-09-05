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
