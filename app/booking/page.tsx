import BookInfo from "@/components/ui/booking/BookInfo";
import SelectedRooms from "@/components/ui/booking/SelectedRooms";
import SectionTitle from "@/components/ui/global/SectionTitle";
import BookingForm from "@/components/ui/booking/BookingForm";
import { formatThaiDate } from "@/utils/formatThaiDate";
import { calNights } from "@/utils/bookingCal";
import { NightsCal } from "@/utils/NightsCal";
import GuestForm from "@/components/ui/booking/GuestForm";
import BookingSummary from "@/components/ui/booking/BookingSummary";

type BookingPage = {
  searchParams: Promise<{
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms: number;
    roomId: string;
  }>;
};

async function BookingPage({ searchParams }: BookingPage) {
  const { checkIn, checkOut, guests, rooms, roomId } = await searchParams;
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  return (
    <div className="grid gap-y-2">
      <SectionTitle title="Booking Detail" />
      <p>
        {formatThaiDate(checkInDate)} - {formatThaiDate(checkOutDate)} จำนวน
        {NightsCal(checkInDate, checkOutDate)} คืน
      </p>
      <div className="grid grid-cols-2">
        <GuestForm checkIn={checkIn} checkOut={checkOut} />
        <BookingSummary />
      </div>
    </div>
  );
}
export default BookingPage;
