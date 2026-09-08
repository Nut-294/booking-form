export type RoomWithType = {
  id: string;
  roomNumber: string;
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";
  roomTypeId: string;
  roomType: {
    id: string;
    name: string;
    price: number;
    capacity: number;
    description: string;
  };
};