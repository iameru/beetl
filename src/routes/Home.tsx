import { useState } from "react"
import { Link } from "react-router-dom"
import { CreateBeetl } from "../components/Create"

export function Home() {

  const suggestions = [
    'solidarisches wirtschaften',
    'gemeinsame kassen',
    'erreichen von spendenzielen'
  ]
  const [idxSug, setIdxSug] = useState(0)
  setTimeout(()=>{
    const newIdx = (idxSug+1 != suggestions.length) ? idxSug+1 : 0
    setIdxSug(newIdx)
  }, 1000)

  return (
  <> 
    <section>
      <h2 className="text-center text-2xl">beetl</h2>
      <div className="flex flex-col items-center">
        <p>
          erstelle ein beetl für
        </p>
        <div className="w-5/6 flex justify-center items-center">
          <p className="text-emerald-600" id="changing-text">
          {suggestions[idxSug]}
          </p>
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
