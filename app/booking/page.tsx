import BookInfo from "@/components/ui/ิbooking/BookInfo";
import BookingSummary from "@/components/ui/ิbooking/BookingSummary";
import GuestForm from "@/components/ui/ิbooking/GuestForm";
import SelectedRooms from "@/components/ui/ิbooking/SelectedRooms";
import SectionTitle from "@/components/ui/global/SectionTitle";

type BookingPage = {
  searchParams: Promise<{
    checkIn: Date;
    checkOut: Date;
    guests: number;
    rooms: number;
    roomId: string;
  }>;
};

async function BookingPage({ searchParams }: BookingPage) {
  const { checkIn, checkOut, guests, rooms, roomId } = await searchParams;
  // console.log("roomId = ", roomId);
  return (
    <div className="grid gap-y-2">
      <SectionTitle title="BookingPage" />
      <BookInfo
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
        rooms={rooms}
      />
      <SelectedRooms roomId={roomId} />
      <BookingSummary />
      <GuestForm />
    </div>
  );
}
export default BookingPage;
