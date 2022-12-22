import { Link } from "react-router-dom"
import { CreateBeetl } from "../components/home"
import { UsageSuggestions } from "../components/home"

export function Home() {


  return (
  <> 
    <section>
      <h2 className="text-center text-2xl">beetl</h2>
      <div className="flex flex-col items-center">
        <p>
          erstelle ein beetl für
        </p>
        <div className="w-5/6 flex justify-center items-center">
          <UsageSuggestions /> 
        </div>
        <Link 
          className="text-sm text-link"
        to="/about">more infos</Link>
      </div>
    </section>
    <section className="flex flex-col items-center">
      <CreateBeetl />
    </section>
  </>
  )
}
