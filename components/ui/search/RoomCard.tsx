import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../card";
import { Badge } from "../badge";
import Link from "next/link";
import { Button } from "../button";

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
};

export default function RoomCard({
  id,
  roomNumber,
  status,
  roomType,
}: RoomCardProps) {
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
        <Link href={`/rooms/${id}`}>
          <Button>View Details</Button>
        </Link>
        <Button className="ml-4">Select Room</Button>
      </div>
    </Card>
  );
}
