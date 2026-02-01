import { Link } from "react-router"

export const Logo = () => {
  return (
    <Link to='/' className="text-2xl font-bold tracking-tighter transition-all duration-300 flex items-center justify-center">
        <div className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 border border-gray-200 shadow-sm">
          <img 
            src="/logo.png" 
            alt="logo" 
            className="h-full w-full object-cover scale-180" 
          />
        </div>
    </Link>
  )
}