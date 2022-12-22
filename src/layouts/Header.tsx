import { NavLink } from "react-router-dom"
import { navRoutes } from "../routes"

export function Header() {

  return (
  <header className="">
    <nav>
      {navRoutes.map(route=>
        <NavLink to={route.path} 
              key={route.name}>
          {route.name}
        </NavLink>
        )}
    </nav>
  </header>
  )
}