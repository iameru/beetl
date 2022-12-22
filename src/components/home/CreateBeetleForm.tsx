import { useState } from "react"
import { getUUID } from "../../api"


type CreateFormState = {
  name: string
  targetSum: number | ""
}

const defaultFormState:CreateFormState = { 
  name: getUUID(),
  targetSum: ""
 }

export function CreateBeetl() {

  const [beetl, setBeetl] = useState(defaultFormState)


  return (
  <form onSubmit={(e)=>e.preventDefault()} 
      className="flex rounded divide-x shadow"
      >
    <div className="divide-y">
      <div className="grid grid-cols-2 gap-2 p-1">
        <p className="text-gray-500 text-sm text-right">https://beetl.xyz/</p>
        <input
          value={beetl.name}
          placeholder='wie soll der link aussehen'
          className="bg-transparent w-full text-cyan-900" 
          type="text" 
          onChange={(e)=>setBeetl( ({
            ...beetl,
            name: e.target.value
          }))}
          />
        </div>
        <div className="grid grid-cols-12 gap-2 p-1">
          <p className="min-w-fit text-right col-span-6">Das Bietziel</p>
          <input
            placeholder='0€'
            value={beetl.targetSum}
            className="bg-transparent col-span-4 text-cyan-900 "
            type="number" 
            onChange={(e)=>setBeetl( ({
              ...beetl,
              targetSum: parseInt(e.target.value)
            }))}
            />
          <select>
            <option>€</option>
            <option>Y</option>
            <option>$</option>
          </select>
        </div>
      </div>
      <button type="submit"
        className="py-2 px-4 bg-emerald-500 rounded-r-lg"
      >
        GO!
      </button>
    </form>
  )
}
