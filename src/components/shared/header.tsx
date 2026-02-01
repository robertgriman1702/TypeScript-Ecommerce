import { Link } from "react-router-dom";
import { HiOutlineSearch, HiOutlineShoppingCart } from "react-icons/hi";
import { FaBars } from "react-icons/fa";
import { Logo } from "./logo";

export const Header = () => {
  return (
    <header className="bg-white text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12">
      <Logo />
      

      <div className="flex gap-5 items-center">
        <button>
          <HiOutlineSearch size={25}/>
        </button>
        <div className="relative">
          <Link to='/account' className="border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold">
            P
          </Link>
        </div>
        <button className="relative">
          <span className="absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full">0</span>
          <HiOutlineShoppingCart size={25}/>
        </button>
        <button className="md:hidden">
          <FaBars size={25}/>
        </button>
      </div>
    </header>
  )
}
