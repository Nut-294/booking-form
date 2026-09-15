"use client";
import { RoomWithType } from "@/utils/RoomType";
import RoomCard from "./RoomCard";
import { useState } from "react";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import createSearchQuery from "@/utils/SearchQuery";

type RoomSelectionProp = {
  rooms: RoomWithType[];
  params: {
    checkIn: Date;
    checkOut: Date;
    guests: number;
    rooms: number;
  };
};

function RoomSelection({ rooms, params }: RoomSelectionProp) {
  const [selectedRooms, setSelectRooms] = useState<string[]>([]);
  const router = useRouter();

  //เลือกห้อง
  const handleSelect = (id: string) => {
    setSelectRooms((prev) => {
      // ถ้าห้องนี้ถูกเลือกอยู่แล้ว → ยกเลิกการเลือก
      if (prev.includes(id)) {
        return prev.filter((roomId) => roomId !== id);
      }
      // ถ้าเลือกห้องครบตามจำนวนที่ลูกค้าต้องการแล้ว
      if (prev.length >= params.rooms) {
        return prev;
      }
      return [...prev, id];
    });
  };

  //คำนวณจำนวนที่ห้องพักรองรับได้ -> จาก id ห้องที่เลือกแล้ว (selectedRooms)
  const totalRoomCapacity = selectedRooms.reduce((total, roomId) => {
    //เอา id ห้องที่เลือกแต่ละห้อง ไปหาข้อมูลห้อง
    const room = rooms.find((room) => room.id === roomId);
    //เอา capacity ของ room มาบวก
    const totalCapacity = total + (room?.roomType.capacity ?? 0);
    return totalCapacity;
  }, 0);

  console.log("select", selectedRooms);

  const query = createSearchQuery({
    ...params,
  });

  const searchParams = new URLSearchParams(query);

  selectedRooms.forEach((roomId) => {
    searchParams.append("roomId", roomId);
  });

  const bookingUrl = `/booking?${searchParams.toString()}`;

  const canBooking =
    selectedRooms.length <= params.rooms && totalRoomCapacity >= params.guests;

  const handleBooking = () => {
    if (!canBooking) return;
    router.push(bookingUrl);
  };

  return (
    <div>
      <div className="flex justify-between items-center mx-20">
        <h5 className="text-2xl my-4">RoomSelect : {selectedRooms.length}</h5>
        <h5 className="text-2xl my-4">RoomCapacity : {totalRoomCapacity}</h5>

        <Button
          className="text-2xl my-4 p-4 bg-gray-600 cursor-pointer"
          onClick={handleBooking}
          disabled={!canBooking}
        >
          Booking
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return (
            <RoomCard
              key={room.id}
              {...room}
              {...params}
              handleSelect={handleSelect}
              selected={selectedRooms.includes(room.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
export default RoomSelection;
