import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { SocialLinks } from "../../constants/links";

export const Footer = () => {
  return (
    <footer className="mt-10 py-12 px-4 bg-gray-950  sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-star gap-16 text-slate-200 text-sm">
      {/* Logo - ahora con ancho fijo */}
      <div className="flex flex-col gap-6 md:max-w-xs flex-1">
        <Link to='/' className="text-2xl font-bold tracking-tighter transition-all duration-300 flex items-center justify-center md:justify-start">
          <div className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 border border-gray-200 shadow-sm">
            <img 
              src="/logo.png" 
              alt="logo" 
              className="h-full w-full object-cover scale-200" 
            />
          </div>
        </Link>
        <p className="text-xs font-medium"> © 2025 Pegazo C.A. Todos los derechos reservados.</p>
      </div>
    
      
      {/* Boletín - con ancho flexible pero máximo */}
      <div className="flex flex-col gap-6 md:max-w-xs flex-1">
        <p className="font-semibold uppercase tracking-tighter">
          suscríbete a nuestro boletín
        </p>
        <p className="text-xs font-medium">recibe promociones exclusivas</p>
        <div className="border border-gray-800 flex items-center gap-2 px-4 py-2 rounded-full">
          <input 
            type="email" 
            placeholder="Ingresa tu correo electrónico"
            className="bg-gray-950 text-slate-200 w-full focus:outline-none" />
            <button className="text-slate-200">
              <BiChevronRight size={20}/>
            </button>
        </div>
      </div>
      {/* Redes sociales - con ancho específico y alineado a la izquierda */}
      <div className="flex flex-col gap-6 md:max-w-[200px] flex-shrink-0 ">
        <p className="font-semibold uppercase tracking-tighter">
          Síguenos
        </p>
        <p className="text-xs font-medium">
          Encuéntranos en nuestras redes sociales.
        </p>
        <div className="flex border border-gray-800 rounded-md overflow-hidden">
          {SocialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 w-full h-full py-3.5 flex items-center justify-center transition-all hover:text-white hover:bg-gray-900"
              aria-label={link.title}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      
      {/* Políticas - con ancho flexible pero máximo */}
      <div className="flex flex-col gap-6 md:max-w-xs flex-1">
        <p className="font-semibold uppercase tracking-tighter">
          políticas
        </p>
        <nav className="flex flex-col gap-2 text-xs font-medium">
          <Link to='/'>productos</Link>
          <Link to='#' className="text-slate-300 hover:text-white">Términos y condiciones</Link>
          <Link to='#' className="text-slate-300 hover:text-white">Política de privacidad</Link>
        </nav>
      </div>
      
    </footer>
  )
}