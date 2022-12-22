import { useState } from "react"


export function UsageSuggestions() {

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
  


  return <p className="text-emerald-600" id="changing-text">
            {suggestions[idxSug]}
         </p>
}