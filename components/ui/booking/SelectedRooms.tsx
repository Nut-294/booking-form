import { Card, CardHeader, CardTitle } from "../card";
import RoomSelectedCard from "./RoomSelectedCard";

function SelectedRooms({ roomId }: { roomId: string | string[] }) {
  const roomIds = Array.isArray(roomId) ? roomId : [roomId];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="underline decoration-2 text-xl">
          รายละเอียดห้องพัก
        </CardTitle>
      </CardHeader>
      {roomIds.map((id,index) => {
        return <RoomSelectedCard key={index} id={id} />;
      })}
    </Card>
  );
}
export default SelectedRooms;
