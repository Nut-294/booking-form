"use client";
import { RoomWithType } from "@/utils/RoomType";
import RoomCard from "./RoomCard";
import { useState } from "react";

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
  console.log("select", selectedRooms);

  //คำนวณจำนวนที่ห้องพักรองรับได้ -> จาก id ห้องที่เลือกแล้ว (selectedRooms)
  const totalRoomCapacity = selectedRooms.reduce((total, roomId) => {
    //เอา id ห้องที่เลือกแต่ละห้อง ไปหาข้อมูลห้อง
    const room = rooms.find((room) => room.id === roomId);
    //เอา capacity ของ room มาบวก
    const totalCapacity = total + (room?.roomType.capacity ?? 0);
    return totalCapacity;
  }, 0);

  return (
    <div>
      <div className="flex justify-between items-center mx-20">
        <h5 className="text-2xl my-4">RoomSelect : {selectedRooms.length}</h5>
        <h5 className="text-2xl my-4">RoomCapacity : {totalRoomCapacity}</h5>
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
