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
  const params = await searchParams;
  // console.log("params = ", params);
  return (
    <>
      <SectionTitle title="BookingPage"/>
      <BookInfo {...params}/>
      <SelectedRooms />
      <GuestForm />
      {/*  ทางขวา */}
      <BookingSummary />
      <p>Comfrim Booking</p>
    </>
  );
}
export default BookingPage;
