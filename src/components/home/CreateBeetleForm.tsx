import { useState } from "react"
import { apiCreateBeetl, getUUID } from "../../api"
import CurrencyInput from "react-currency-input-field"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { BeetleType } from "../../types"

const defaultFormState:BeetleType = { 
  name: getUUID(),
  targetSum: ""
 }

export function CreateBeetl() {

  const [beetl, setBeetl] = useState(defaultFormState)
  let navigate = useNavigate()


  return (
  <form 
    className="flex divide-x shadow m-3 rounded-lg"
    onSubmit={async (e)=>{

      e.preventDefault()

      const route = `/${beetl.name}`
      const data = {...beetl, id:beetl.name}
      const response = await axios.post("http://localhost:3000/beetls", data)

      if (response.status === 201) {
        navigate(route)
      } else {
        // show errors and feedback
        console.log(response.status, response)
      }
    }}
      >
      <div className="grid grid-cols-2 gap-2 p-1">
        <p className="text-gray-500 text-right">https://beetl.xyz/</p>
        <input
          value={beetl.name}
          required={true}
          maxLength={64}
          placeholder='wie soll der link aussehen'
          className="bg-transparent w-full text-cyan-800" 
          type="text" 
          onChange={(e)=>setBeetl( ({
            ...beetl,
            name: e.target.value
          }))}
          />
        </div>
      <button type="submit"
        className="py-2 px-4 rounded-r-lg bg-emerald-500 hover:bg-emerald-300"

      >
        GO!
      </button>
    </form>
  )
}
        /* <div className="grid grid-cols-2 gap-2 p-1">
          <p className="min-w-fit text-right">Das Bietziel</p>
          <CurrencyInput
            placeholder='0 €'
            suffix=" €"
            required={true}
            intlConfig={{locale:'de-DE', currency:'EUR'}}
            className="bg-transparent w-full text-cyan-800" 
            allowNegativeValue={false}
            allowDecimals={false}
            maxLength={64}
            defaultValue={beetl.targetSum}
            onValueChange={(value, name)=>setBeetl( ({
              ...beetl,
              targetSum: parseInt(value as string)
            }))}
            />
        </div> */