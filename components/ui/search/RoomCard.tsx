import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../card";
import { Badge } from "../badge";
type RoomCardProps = {
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
    <Card>
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
    </Card>
  );
}
