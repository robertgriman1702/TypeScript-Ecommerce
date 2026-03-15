import { NavLink, useSearchParams } from "react-router-dom";
import { Dropdown } from "../shared/Dropdown";

export const Navbar = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const currentSearch   = searchParams.get('search')   || '';

  const linkClass = (active: boolean) =>
    `${active
      ? "text-amber-400 font-bold border-b-2 border-amber-400"
      : "text-white font-medium hover:bg-slate-500 rounded-lg py-2 px-3"
    } text-xs md:text-sm uppercase transition-all duration-300 pb-1 flex items-center gap-1`;

  const isCombosActive  = currentCategory === 'combos' && currentSearch === '';

  return (
    <div className="bg-slate-700 border-b border-slate-800 py-2 md:py-3 px-4 lg:px-20">
      <nav className="flex justify-between items-center gap-2 w-full overflow-x-auto">
        <div className="flex items-center gap-3 md:gap-8 flex-shrink-0">

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
              label="OFICINA"
              items={["Engrapadoras", "Perforadoras", "Calculadoras"]}
              links={[
                "/products?search=Engrapadoras",
                "/products?search=Perforadoras",
                "/products?search=Calculadoras"
              ]}
              variant="navbar"
            />
          </div>

          <NavLink to="/products?category=combos" className={() => linkClass(isCombosActive)}>
            COMBOS
          </NavLink>

          <NavLink to="/products" className={() => linkClass(currentCategory === '' && currentSearch === '')}>
            TODO
          </NavLink>
        </div>

        <p className="text-[10px] md:text-xs text-slate-300 hidden sm:flex items-center gap-1 flex-shrink-0">
          Actualizada: <strong className="text-white">15/3/2026</strong>
        </p>
      </nav>
    </div>
  );
};