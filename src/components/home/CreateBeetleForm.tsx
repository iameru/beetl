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
    <form onSubmit={(e)=>e.preventDefault()} >
      <div className="flex border rounded divide-x">
        <div className="divide-y">
          <input
            value={beetl.name}
            placeholder='wie soll der link aussehen'
            className="bg-transparent w-full" 
            type="text" 
            onChange={(e)=>setBeetl( ({
              ...beetl,
              name: e.target.value
            }))}
            />
          <div className="flex divide-x">
            <p>Das Ziel?</p>
            <input
              placeholder='0€'
              value={beetl.targetSum}
              className="bg-transparent"
              type="number" 
              onChange={(e)=>setBeetl( ({
                ...beetl,
                targetSum: parseInt(e.target.value)
              }))}
              />
          </div>
        </div>
        <button type="submit"
          className="p-2"
        >
          GO!
        </button>
      </div>
    </form>
  )
}
