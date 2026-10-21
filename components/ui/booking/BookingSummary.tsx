import { formatThaiDate } from "@/utils/formatThaiDate";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Separator } from "../separator";
import { NightsCal } from "@/utils/NightsCal";
import { getPriceRoom } from "@/action";
import RoomList from "./RoomList";

async function BookingSummary({
  roomId,
  checkIn,
  checkOut,
}: {
  roomId: string | string[];
  checkIn: Date;
  checkOut: Date;
}) {
  const roomIds = Array.isArray(roomId) ? roomId : [roomId];

  const nights = NightsCal(checkIn, checkOut);

  // ดึงราคาของห้องทั้งหมด
  const prices = await Promise.all(roomIds.map((id) => getPriceRoom(id)));
  // console.log("prices", prices);

  // คำนวณราคารวมทุกห้อง
  const totalPrice = prices.reduce((total, price) => total + price * nights, 0);
  // console.log("totalPrice", totalPrice);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="underline decoration-2 text-xl p-4">
          BookingSummary
        </CardTitle>
      </CardHeader>
      <CardContent className="px-8 leading-10 font-semibold">
        <div>
          {roomIds.map((id) => {
            return <RoomList key={id} id={id} />;
          })}
        </div>
        <p className="flex justify-between">
          วันเข้าพัก<span>{formatThaiDate(checkIn)}</span>
        </p>
        <p className="flex justify-between">
          วันออก<span>{formatThaiDate(checkOut)}</span>
        </p>

        <p className="flex justify-between">
          จำนวนคืน <span>{nights}</span>
        </p>

        <Separator />
        <div className="flex justify-between leading-10">
          รวม <span>{totalPrice}</span>
        </div>
      </CardContent>
    </Card>
  );
}
export default BookingSummary;
