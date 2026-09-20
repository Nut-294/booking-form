import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { formatThaiDate } from "@/utils/formatThaiDate";

type BookInfoProps = {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  rooms: number;
};

function BookInfo({ checkIn, checkOut, guests, rooms }: BookInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="underline decoration-2 text-xl">
          รายละเอียดการจอง
        </CardTitle>
      </CardHeader>
      <CardContent className="leading-6 px-8">
        <p>วันที่เข้าพัก : {formatThaiDate(checkIn)}</p>
        <p>วันที่ออก : {formatThaiDate(checkOut)}</p>
        <p>จำนวนผู้เข้าพัก : {guests} คน</p>
        <p>จำนวนห้องที่จอง :{rooms} ห้อง</p>
      </CardContent>
    </Card>
  );
}
export default BookInfo;
