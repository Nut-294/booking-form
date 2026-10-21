import { getRoomDetail } from "@/action";
async function RoomList({ id }: { id: string }) {
  const roomDetail = await getRoomDetail(id);
  if (!roomDetail) return <p>RoomDetail Not Found ...</p>;

  return <p className="flex justify-between">{roomDetail.roomType.name} <span>{roomDetail.roomType.price}</span></p>;
}
export default RoomList;
