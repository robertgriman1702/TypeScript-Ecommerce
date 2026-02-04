import { Link } from "react-router-dom";
import { HiOutlineSearch, HiOutlineShoppingCart } from "react-icons/hi";
import { FaBars } from "react-icons/fa";
import { Logo } from "./logo";
import { FaWhatsapp } from 'react-icons/fa';

export const Header = () => {
  return (
    <header className="bg-slate-800 text-white py-4 px-5 border-b border-slate-800 lg:px-20">
      <div className="flex items-center gap-5">
        <div className="w-[30%]">
          <Logo />
        </div>
        <div className="w-[70%] pl-6 md:pl-8 flex justify-between">
            <div className="flex flex-col gap-4">
              <span className="text-slate-300 flex flex-row">
                <span className="font-semibold text-white">Lo más buscado:</span> 
                Papeles, Carpetas, Limpia Tipo...
              </span>
              <button>
                <HiOutlineSearch size={25}/>
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Link to='/account' className="border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold">
                  P
                </Link>
              </div>    
              <div className="flex flex-row-reverse items-center gap-4">
                <div>
                  <button className="relative">
                    <span className="absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full">0</span>
                    <HiOutlineShoppingCart size={44}/>
                  </button>
                  <button className="md:hidden">
                    <FaBars size={25}/>
                  </button>
                </div>
                <div className="flex fle-row items-center gap-3">
                  <FaWhatsapp 
                    size={44}
                    className="text-white text-2xl" 
                  />
                  <div className="flex flex-col">
                    <p>TELEFONOS:</p>
                    <a href="https://wa.me/584244085004" target="_blank">(+58) 424 408 5004</a>
                    <a href="https://wa.me/584144100978" className="-mt-2">(+58) 414 410 0978</a>
                  </div>
                </div>
              </div>
            </div>
         </div>
      </div>
    </header>
  )
}
