import RoomDetail from "@/components/ui/search/RoomDetail";
import { getRoomDetail } from "@/action";

type RoomDetailProps = {
  id: string;
};

type SearchParams = {
  checkIn: string;
  checkOut: string;
  guests: string;
  rooms: string;
};

async function SingleRoom({
  params,
  searchParams,
}: {
  params: Promise<RoomDetailProps>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const { checkIn, checkOut, guests, rooms } = await searchParams;

  const roomDetail = await getRoomDetail(id);

  if (!roomDetail) {
    return <>Room Not Found</>;
  }

  return (
    <RoomDetail
      {...roomDetail}
      checkIn={checkIn}
      checkOut={checkOut}
      guests={Number(guests)}
      rooms={Number(rooms)}
    />
  );
}

export default SingleRoom;