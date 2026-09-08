import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../card";
import { Badge } from "../badge";
import Link from "next/link";
import { Button } from "../button";
import createSearchQuery from "../../../utils/SearchQuery";

type RoomCardProps = {
  id: string;
  roomNumber: string;
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";
  roomType: {
    name: string;
    price: number;
    capacity: number;
    description: string;
  };
  checkIn: Date;
  checkOut: Date;
  guests: number;
  rooms: number;
  selected: boolean;
  handleSelect: (id: string) => void;
};

export default function RoomCard({
  id,
  roomNumber,
  status,
  roomType,
  checkIn,
  checkOut,
  guests,
  rooms,
  selected,
  handleSelect,
}: RoomCardProps) {
  const query = createSearchQuery({
    checkIn,
    checkOut,
    guests,
    rooms,
  });

  const statusVariant = {
    AVAILABLE: "bg-green-500",
    OCCUPIED: "bg-yellow-500",
    MAINTENANCE: "bg-red-500",
  } as const;

  return (
    <Card className="bg-amber-100">
      <CardHeader>
        <CardTitle>Room {roomNumber}</CardTitle>
        <CardAction>
          <Badge className={statusVariant[status]}> {status} </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Type: {roomType.name}</p>
        <p>Price: {roomType.price.toLocaleString()} ฿ / night</p>
      </CardContent>

      <div className="ml-4">
        <Link href={`/rooms/${id}?${query}`}>
          <Button className="bg-orange-700 hover:bg-orange-600" >View Details</Button>
        </Link>
        <Button className={selected ? "bg-green-700 hover:bg-green-600":"bg-blue-700 hover:bg-blue-600"} onClick={() => handleSelect(id)}>
          {selected ? "เลือกแล้ว" : "Select Room"}
        </Button>
      </div>
    </Card>
  );
}
