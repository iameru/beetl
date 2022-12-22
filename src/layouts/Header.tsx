import { Link, NavLink } from "react-router-dom"
import { navRoutes } from "../routes"

export function Header() {

  return (
  <header className="h-16 p-2 flex justify-around items-center bg-emerald-50
        border-b rounded-b border-b-emerald-100">
    <Link to='/' className="h-full" >
      <img src="/src/assets/devLogo.svg" className="h-full" />
    </Link>
    <nav className="flex gap-4">
      {navRoutes.map(route=>
        <NavLink to={route.path} 
              key={route.name}
              className={ ({isActive})=> {
                const cls = 'text-2xl uppercase font-medium text-gray-900'
                return isActive? cls+' hover:cursor-default underline' : cls+' text-gray-600 hover:text-teal-800'
               }
              }
        >
          {route.name}
        </NavLink>
        )}
    </nav>
  </header>
  )
}