"use client";

import { useSearchParams } from "next/navigation";

type SearchFormProps = {
  checkIn: string;
  checkOut: string;
  guests: string;
  rooms: string;
};
export default function SearchForm({ params }: { params: SearchFormProps }) {
  console.log("params",params);
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");
  const rooms = searchParams.get("rooms");
  console.log("searchParams",checkIn, checkOut, guests, rooms);
  return <div>SearchForm</div>;
}
