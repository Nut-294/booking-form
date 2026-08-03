import RoomsList from "@/components/ui/search/RoomsList";
import SearchForm from "@/components/ui/search/SearchForm";

type searchParamsProps = {
  searchParams: Promise<{
    checkIn: string;
    checkOut: string;
    guests: string;
    rooms: string;
  }>;
};

async function SearchPage({ searchParams }: searchParamsProps) {
  const params = await searchParams;
  return (
    <>
      <SearchForm params={params}/>
      <RoomsList />
    </>
  );
}
export default SearchPage;
