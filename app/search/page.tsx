import RoomsList from "@/components/ui/search/RoomsList";
import SearchForm from "@/components/ui/search/SearchForm";

type searchPageProps = {
  searchParams: Promise<{
    checkIn: Date
    checkOut: Date
    guests: number
    rooms: number
  }>;
};

async function SearchPage({ searchParams }: searchPageProps) {
  const params = await searchParams;
  // console.log("params",params)
  return (
    <>
      <SearchForm params={params}/>
      <RoomsList params={params} />
    </>
  );
}
export default SearchPage;
