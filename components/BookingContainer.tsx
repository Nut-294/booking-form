import BookingCalendar from "./BookingCalendar";
import BookingForm from "./BookingForm";

function BookingContainer() {
  return (
    <div className="flex flex-col justify-center">
      <BookingCalendar />
      <BookingForm />
    </div>
  );
}
export default BookingContainer;
