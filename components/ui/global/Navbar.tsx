import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";

function Navbar() {
  return (
    <div className="p-8 mb-2  bg-amber-400">
      <Link
        href="/search"
        className="flex items-center gap-4 text-2xl justify-center"
      >
        <AiOutlineHome />
        Home
      </Link>
    </div>
  );
}
export default Navbar;
