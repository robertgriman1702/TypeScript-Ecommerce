import { NavLink } from "react-router-dom";
import { navbarlinks } from "../../constants/links";

export const Navbar = () => {
  return (
    <div className="bg-slate-600 border-b border-slate-600 py-3 px-5 lg:px-12">
      <nav className="flex justify-between items-center gap-4 w-full">
        <div className="flex justify-between w-[70%]">
          {navbarlinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.href}
              className={({ isActive }) =>
                `${isActive ? "text-cyan-600 underline" : ""} transition-all duration-300 hover:text-cyan-600 hover:underline`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>
        <div className="w-[30%] text-left">
          <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block">
            Web Actualizada: 1/9/2025
          </p>
        </div>
      </nav>
    </div>
  )
}