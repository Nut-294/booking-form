import { getAvailableRooms } from "@/action";
import RoomCard from "./RoomCard";

type RoomsListProps = {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  rooms: number;
};

export default async function RoomsList({
  params,
}: {
  params: RoomsListProps;
}) {
  const { checkIn, checkOut, guests, rooms } = params;
  const availableRooms = await getAvailableRooms({
    checkIn,
    checkOut,
    guests,
    rooms,
  });
  
  if(availableRooms.length === 0){
    return <div className="text-4xl">Room Not Found ...</div>
  }

  return (
    <div>
      {availableRooms.map((room) => {
        return <RoomCard key={room.id} />;
      })}
    </div>
  );
}
