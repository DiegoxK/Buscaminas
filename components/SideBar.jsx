import Link from "next/link";
import { AiFillHome, AiFillFire } from "react-icons/ai";
import { HiNewspaper } from "react-icons/hi";

function SideBar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg z-10">
      <i>
        <SideBarIcon text="Home" icon={<AiFillHome size="28" />} />
      </i>
      <i>
        <SideBarIcon
          href="/buscaminas"
          text="Buscamina!"
          icon={<AiFillFire size="28" />}
        />
      </i>
      <i>
        <SideBarIcon
          text="NewsApp"
          href="/news"
          icon={<HiNewspaper size="28" />}
        />
      </i>
    </div>
  );
}

const SideBarIcon = ({ icon, text = "Tooltip", href = "/" }) => {
  return (
    <Link href={href}>
      <div className="relative flex items-center justify-center h-12 w-12 my-2 mx-auto shadow-lg bg-gray-800 text-green-500 rounded-3xl hover:rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300 ease-linear group cursor-pointer">
        {icon}
        <span className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
          {text}
        </span>
      </div>
    </Link>
  );
};
export default SideBar;
