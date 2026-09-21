import { getRoomDetail } from "@/action";
import { CardContent } from "../card";

async function RoomSelectedCard({ id }: { id: string }) {
  const room = await getRoomDetail(id);
  if (!room) return <p>RoomDetail Not Found ...</p>;
  return (
    <CardContent className="leading-6 px-8">
      <p>เลขห้อง : {room.roomNumber}</p>
      <p>ประเภทห้อง : {room.roomType.name}</p>
      <p>ราคา : {room.roomType.price}</p>
      <p>จำนวนผู้เข้าพัก : {room.roomType.capacity}</p>
    </CardContent>
  );
}
export default RoomSelectedCard;
