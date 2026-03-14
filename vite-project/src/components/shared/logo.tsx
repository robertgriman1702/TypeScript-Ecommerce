import { Link } from "react-router"

export const Logo = () => {
  return (
    <Link to='/' className="transition-all duration-300 flex items-center justify-start">
      <div className="bg-amber-50 rounded-xl px-3 py-1">
        <img 
          src="/img/logo2.png" 
          alt="Pegazo C.A." 
          className="h-14 w-auto md:h-16 lg:h-20 xl:h-24 object-contain"
        />
      </div>
    </Link>
  )
}