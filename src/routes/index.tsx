import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import { About } from "./About";
import { Beetl, BeetlErr, beetlLoader } from "./Beetl";
import { Layout } from "../layouts";


const _routes  = [
  {
    name:'home', 
    path:'/', 
    index:true, 
    element: <Home />,

  },
  {name:'about', path:'about', element:<About />}
]
export const navRoutes = _routes.map(r=>({ name:r.name, path:r.path }))

const allRoutes = [
  ..._routes, 
  {
    name:'beetl', 
    path:':id', 
    element:<Beetl />,
    errorElement: <BeetlErr />,
    loader: beetlLoader
  }
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Layout />,
    children: allRoutes
  }
])

export default router