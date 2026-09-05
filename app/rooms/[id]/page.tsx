import { getRoomDetail } from "@/action";

type RoomDetailProp = {
  id: string;
};

async function RoomDetail({ params }: { params: RoomDetailProp }) {
  const id = await params.id;
  const roomDetail = await getRoomDetail(id)
  console.log(roomDetail)
 
  return <div>RoomDetail</div>;
}
export default RoomDetail;
