import { Outlet } from "react-router-dom";
import { Header } from "./Header";

  
export function Layout() {

  return (
    <main className="h-screen w-screen flex flex-col bg-[#f9fbfb]">
      <Header />
      <Outlet />
    </main>
  )
}