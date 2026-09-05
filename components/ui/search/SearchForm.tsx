import Form from "../form/Form";

type SearchFormProps = {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  rooms: number;
};
export default function SearchForm({ params }: { params: SearchFormProps }) {
  // console.log("params", params);
  // const searchParams = useSearchParams();
  // const checkIn = searchParams.get("checkIn");
  // const checkOut = searchParams.get("checkOut");
  // const guests = searchParams.get("guests");
  // const rooms = searchParams.get("rooms");
  // console.log("searchParams", checkIn, checkOut, guests, rooms);
  return (
    <Form
      defaultValues={{
        checkIn: params.checkIn ? new Date(params.checkIn) : undefined,
        checkOut: params.checkOut ? new Date(params.checkOut) : undefined,
        guests: Number(params.guests ?? 1),
        rooms: Number(params.rooms ?? 1),
      }}
    />
  );
}
