import BookInfo from "@/components/ui/booking/BookInfo";
import SelectedRooms from "@/components/ui/booking/SelectedRooms";
import SectionTitle from "@/components/ui/global/SectionTitle";
import BookingForm from "@/components/ui/booking/BookingForm";

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
      <BookingForm checkIn={new Date(checkIn)} checkOut={new Date(checkOut)} />
    </div>
  );
}
export default BookingPage;
