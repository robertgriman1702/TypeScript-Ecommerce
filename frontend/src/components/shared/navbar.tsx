import { NavLink, useSearchParams } from "react-router-dom";
import { Dropdown } from "../shared/Dropdown"; 

export const Navbar = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const currentSearch = searchParams.get('search') || '';

  const linkClass = (active: boolean) =>
    `${
      active
        ? "text-amber-400 font-bold border-b-2 border-amber-400" 
        : "text-white font-medium hover:bg-slate-500 rounded-lg py-2 px-3"
    } text-xs md:text-sm uppercase transition-all duration-300 pb-1 flex items-center gap-1`;

  const isCombosActive = currentCategory === 'combos' && currentSearch === '';

  return (
    <div className="bg-slate-700 border-b border-slate-800 py-2 md:py-3 px-4 md:px-5 lg:px-20 overflow-x-auto">
      <nav className="flex justify-between items-center gap-2 md:gap-4 min-w-max md:min-w-0 w-full">
        
        <div className="flex gap-3 md:gap-8 items-center">
          
          <div className="relative z-50">
            <Dropdown 
              label="PAPELERÍA" 
              items={["Bolígrafos", "Archivadores", "Carpetas", "Blocks"]} 
              links={[
                "/products?search=Bol%C3%ADgrafos", 
                "/products?search=Archivadores", 
                "/products?search=Carpetas",
                "/products?search=Blocks"
              ]} 
              variant="navbar" 
            />
          </div>

          <div className="relative z-50">
            <Dropdown 
              label="ARTÍCULOS DE OFICINA" 
              items={["Engrapadoras", "Perforadoras", "Calculadoras"]} 
              links={[
                "/products?search=Engrapadoras", 
                "/products?search=Perforadoras", 
                "/products?search=Calculadoras"
              ]} 
              variant="navbar" 
            />
          </div>

          <NavLink
            to="/products?category=combos"
            className={() => linkClass(isCombosActive)}
          >
            COMBOS
          </NavLink>

        </div>

        <div className="hidden md:flex w-[30%] justify-end">
          <p className="text-xs text-slate-300 flex items-center gap-2">
            Web Actualizada: <strong className="text-white">15/3/2026</strong>
          </p>
        </div>
        
      </nav>
    </div>
  );
};