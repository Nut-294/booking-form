import RoomDetail from "@/components/ui/search/RoomDetail";
import { getRoomDetail } from "@/action";

type RoomDetailProp = {
  id: string;
};

async function singleRoom({ params }: { params: RoomDetailProp }) {
  const id = await params.id;
  const roomDetail = await getRoomDetail(id);

  if (!roomDetail) {
    return <>Room Not Found</>;
  }
  
  console.log("roomDetail", roomDetail);
  return (
    <>
      <RoomDetail {...roomDetail} />
    </>
  );
}
export default singleRoom;
