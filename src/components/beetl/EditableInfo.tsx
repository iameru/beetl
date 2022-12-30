import axios from "axios"
import { useId, useState } from "react"
import { useLocation } from "react-router-dom"
import { baseURL } from "../../utils"

type Props = {
  dbRef:string
  label:string
  state:string|number
  setState: React.Dispatch<React.SetStateAction<any>>
}

export function EditableInfo({dbRef, label, state, setState}:Props) {

  const beetlsId = useLocation().pathname.slice(1)
  const buttonId = useId()
  const [initState, setInitState] = useState(state)

  const borderEffect = 'border-gray-500'

  return (
    <div className="flex border rounded-sm">
      <label htmlFor={label}
         className="flex items-center justify-center no-underline w-2/5 min-w-fit" 
          >{label}:</label>
      <input 
        id={label}
        className="w-full pl-4 p-2 focus:outline-none"
        type="text" 
        defaultValue={state} 
        onFocus={ (e) => 
          e.target.parentElement?.classList.add(borderEffect)}
        onBlur={ (e) => 
          e.target.parentElement?.classList.remove(borderEffect)}
        
        onChange={ (e) => {
          const newValue = e.currentTarget.value
          setState(newValue)
          const btn = document.getElementById(buttonId) as HTMLButtonElement
          (newValue === initState) 
            ? btn.classList.add('hidden', 'opacity-0')
            : btn.classList.remove('hidden', 'opacity-0')
          }}
        />
      <button  
        id={buttonId}
        className="bg-green-50 text-sm p-2 hidden opacity-0 min-w-fit"
        onClick={async () => {

          const response = await axios(
            {
              method: 'patch',
              baseURL: baseURL,
              url: `/beetls/${beetlsId}`,
              data: {
                [dbRef]:state
              }
            }
          )
          if (response.status !== 200) {throw new Error('connection issues')}
          setInitState(state)
          // toggleButtonVisibility(document.getElementById(buttonId) as HTMLButtonElement)
          const btn = document.getElementById(buttonId) as HTMLButtonElement
          btn.classList.add('hidden', 'opacity-0')
        }}
        >save</button>
    </div>
  )
}