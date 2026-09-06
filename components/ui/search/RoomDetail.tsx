import { Badge } from "../badge";

type RoomDetailProps = {
  id: string;
  roomNumber: string;
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";
  roomType: {
    name: string;
    price: number;
    capacity: number;
    description: string;
  };
};

function RoomDetail({ id, roomNumber, status, roomType }: RoomDetailProps) {
  const statusVariant = {
    AVAILABLE: "bg-green-500",
    OCCUPIED: "bg-yellow-500",
    MAINTENANCE: "bg-red-500",
  } as const;
  return (
    <div className="mt-[10vh] ml-28 ">
      <div className="flex justify-between items-center">
        <h2 className="text-5xl font-bold">Room {roomNumber}</h2>
        <Badge className={`${statusVariant[status]} text-3xl p-4`}>
          Status : {status}
        </Badge>
      </div>
      <div className="mt-16 space-y-12 text-2xl" >
        <p><span className="font-bold">ประเภทห้อง : </span> {roomType.name}</p>
        <p><span className="font-bold">ราคา : </span> {roomType.price} ต่อคืน</p>
        <p><span className="font-bold">จำนวนผู้พัก : </span> {roomType.capacity} คน</p>
        <p><span className="font-bold">รายละเอียด : </span> {roomType.description}</p>
      </div>
    </div>
  );
}
export default RoomDetail;
