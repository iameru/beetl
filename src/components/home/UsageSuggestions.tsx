import { useState } from "react"
import { randomInt } from "../../utils"

export function UsageSuggestions() {

  const suggestions = [
    'solidarisches wirtschaften',
    'gemeinsame kassen',
    'erreichen von spendenzielen'
  ]
  const randomStart = randomInt(0,suggestions.length)
  const [idxSug, setIdxSug] = useState(randomStart)

  setTimeout(()=>{
    const newIdx = (idxSug+1 != suggestions.length) ? idxSug+1 : 0
    setIdxSug(newIdx)
  }, 3333)
  


  return <p className="text-emerald-600" id="changing-text">
            {suggestions[idxSug]}
         </p>
}