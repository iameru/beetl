import { Outlet } from "react-router-dom";
import { Header } from "./Header";

  
export function Layout() {

  return (
    <div className="w-screen min-h-screen flex flex-col bg-[#f9fbfb]">
      <Header />
      <main className="h-full w-full p-4">
        <Outlet />
      </main>
    </div>
  )
}