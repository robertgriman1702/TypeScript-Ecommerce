import { NavLink, useSearchParams } from "react-router-dom";
import { Dropdown } from "../shared/Dropdown"; 

export const Navbar = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const currentSearch = searchParams.get('search') || '';

  // Clase activa solo si los params coinciden exactamente
  const linkClass = (active: boolean) =>
    `${
      active
        ? "text-amber-400 font-bold border-b-2 border-amber-400" 
        : "text-white font-medium hover:bg-slate-500 rounded-lg py-2 px-3"
    } text-sm uppercase transition-all duration-300 pb-1 flex items-center gap-1`;

  const isCombosActive = currentCategory === 'combos' && currentSearch === '';

  return (
    <div className="bg-slate-700 border-b border-slate-800 py-3 px-5 lg:px-20">
      <nav className="flex justify-between items-center gap-4 w-full">
        
        <div className="flex justify-between gap-8 w-[70%] items-center">
          
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

        <div className="w-[30%] flex justify-end">
          <p className="text-xs text-slate-300 flex items-center gap-2">
            Web Actualizada: <strong className="text-white">23/2/2026</strong>
          </p>
        </div>
        
      </nav>
    </div>
  );
};