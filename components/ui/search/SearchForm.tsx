import Form from "../form/Form";

type SearchFormProps = {
  checkIn: string;
  checkOut: string;
  guests: string;
  rooms: string;
};
export default function SearchForm({ params }: { params: SearchFormProps }) {
  console.log("params", params);
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
