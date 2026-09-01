import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";
import { roomTypes } from "./roomType";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const deluxeRooms = Array.from({ length: 13 }, (_, index) => ({
    roomNumber: `1${String(index + 1).padStart(2, "0")}`,
    status: "AVAILABLE" as const,
  }));

  const standardRooms = Array.from({ length: 7 }, (_, index) => ({
    roomNumber: `2${String(index + 1).padStart(2, "0")}`,
    status: "AVAILABLE" as const,
  }));

  await prisma.roomType.create({
    data: {
      name: "Deluxe",
      price: 1800,
      capacity: 2,

      description: "ห้องพัก Deluxe สำหรับ 2 คน",
      rooms: {
        create: deluxeRooms,
      },
    },
  });

  await prisma.roomType.create({
    data: {
      name: "Standard",
      price: 1200,
      capacity: 1,
      description: "ห้องพัก Standard สำหรับ 1 คน",
      rooms: {
        create: standardRooms,
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
