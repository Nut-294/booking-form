function createSearchQuery({
  checkIn,
  checkOut,
  guests,
  rooms,
}: {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  rooms: number;
}) {
  const params = new URLSearchParams();

  params.set("checkIn", checkIn.toString());
  params.set("checkOut", checkOut.toString());
  params.set("guests", guests.toString());
  params.set("rooms", rooms.toString());

  return params.toString();
}
export default createSearchQuery;
