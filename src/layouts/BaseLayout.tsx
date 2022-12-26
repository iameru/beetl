import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ErrorModal } from "./ErrorModal";
import { Header } from "./Header";

  
export function Layout() {

  const [error, setError] = useState('')

  const location = useLocation()
  if (location.state && location.state.error && !error) {
    // setting error hard for now as not figured out yet
    setError('Da lief was schief... bitte versuchs nochmal')
  }

  return (
    <div className="w-screen min-h-screen flex flex-col bg-[#f9fbfb]">
      <Header />
      <main className="h-full w-full p-4 flex flex-col gap-6">
        <Outlet />
      </main>
      {error && <ErrorModal message={error} />}
    </div>
  )
}