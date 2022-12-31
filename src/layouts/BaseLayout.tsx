import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ErrorModal } from "./ErrorModal";
import { Header } from "./Header";

  
export function Layout() {

  const [errorMsg, setErrorMsg] = useState('')

  const location = useLocation()

  useEffect( () => {
    if (location.state?.error) { setErrorMsg(location.state.error) }
  },[location])

  return (
    <div className="w-screen min-h-screen flex flex-col bg-[#f9fbfb]">
      <Header />
      <main className="h-full w-full p-4 flex flex-col gap-6">
        <Outlet />
      </main>
      {errorMsg && <ErrorModal message={errorMsg} setMessage={setErrorMsg} />}
    </div>
  )
}