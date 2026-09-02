import { prisma } from "./lib/prisma";

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
    });
    return availableRooms
  } catch (error) {
    console.log("Error", error);
    return []
  }
};
