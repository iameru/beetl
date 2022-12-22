import { useState } from "react"
import { getUUID } from "../../api"
import CurrencyInput from "react-currency-input-field"
import { useNavigate } from "react-router-dom"


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
  let navigate = useNavigate()

  function handleForm() {

    // build beetlObj to send to API. build route for
    // button to navigate to it later
    return {
      route: `/${beetl.name}/${beetl.targetSum}`,
      beetlObj: beetl
    }
  }

  return (
  <form onSubmit={(e)=>e.preventDefault()} 
      className="flex rounded divide-x shadow m-3 rounded-r-lg"
      >
    <div className="divide-y">
      <div className="grid grid-cols-2 gap-2 p-1">
        <p className="text-gray-500 text-sm text-right">https://beetl.xyz/</p>
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
        <div className="grid grid-cols-2 gap-2 p-1">
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
        </div>
      </div>
      <button type="submit"
        className="py-2 px-4 rounded-r-lg bg-emerald-500 hover:bg-emerald-300"
        onClick={(e)=>{
          const {route, beetlObj} = handleForm()
          // await makeEntryinDB(beetlObj)
          // if successfull returned 
          // then(navigate(route))
          navigate(route)
        }}
      >
        GO!
      </button>
    </form>
  )
}