import { useState } from "react"
import { getUUID } from "../../api"


type CreateFormState = {
  name: string
}

const defaultFormState = { 
  name: getUUID()
 }

export function CreateBeetl() {


  const [beetl, setBeetl] = useState(defaultFormState)


  return (
    <form onSubmit={(e)=>e.preventDefault()} >
      <div className="flex border rounded divide-x">
        <div className="divide-y">
          <input
            defaultValue={beetl.name}
            placeholder='wie soll der link aussehen'
            className="bg-transparent w-full" 
            type="text" />
          <div className="flex divide-x">
            <p>Das Ziel?</p>
            <input
              placeholder='0€'
              className="bg-transparent"
              type="number" />
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
