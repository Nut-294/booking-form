import { getAvailableRooms } from "@/action";
import RoomSelection from "./RoomSelection";

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

  if (availableRooms.length === 0) {
    return <div className="text-4xl">Room Not Found ...</div>;
  }

  return (
    <>
      <RoomSelection  rooms={availableRooms} params={params}/>
    </>
  
  );
}
