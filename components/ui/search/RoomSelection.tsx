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
      if (prev.includes(id)) {
        return prev.filter((roomId) => roomId != id);
      }
      return [...prev, id];
    });
  };
  console.log("select", selectedRooms);

  return (
    <div>
      <h5 className="text-2xl my-4">RoomSelect : {selectedRooms.length}</h5>
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
