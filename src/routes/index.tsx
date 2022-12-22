import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import { About } from "./About";
import { Layout } from "../layouts";


const _routes  = [
  {name:'home', path:'/', index:true, element: <Home />},
  {name:'about', path:'about', element:<About />}
]
export const navRoutes = _routes.map(r=>({ name:r.name, path:r.path }))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: _routes
  }
])

export default router