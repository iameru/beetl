import axios, { AxiosError } from "axios";
import { ChangeEvent, useId, useState } from "react";
import { LoaderFunctionArgs, Navigate, useLoaderData } from "react-router-dom";
import { EditableInfo } from "../components/beetl/EditableInfo";

import { BeetleType, EntryType } from "../types";
import { baseURL } from "../utils";

export async function beetlLoader({params}:LoaderFunctionArgs) {

  try {
    const beetl = await axios.get(baseURL + `beetls/${params.id}`)
    const entries = await axios.get(baseURL + `entries`, {params: {beetlsId:params.id}})
    return [beetl.data, entries.data]
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message)
    }
}
}

type BeetlResponse = [BeetleType, EntryType[]]


export function BeetlErr() {

  return <Navigate to={'/'} state={{error:"Couldn't load beetl.. try again or create a new one please."}} />
}

type NewEntryState = [EntryType,React.Dispatch<React.SetStateAction<EntryType>> ]


export function Beetl() {

  const [beetl, entries]:BeetlResponse = useLoaderData() as BeetlResponse


  const [newEntry, setNewEntry]: NewEntryState = useState( { beetlsId: beetl.name } )

  const nameId = useId()
  const minId = useId()
  const maxId = useId()
  const resultId = useId()

  function changeEntry(e:ChangeEvent<HTMLInputElement>, key:string) {
    
    setNewEntry({ ...newEntry, [key]: e.currentTarget.value })
  }

  return (
    <div> 
      <section className="flex flex-col gap-3 p-5">
        {Object.entries(beetl).filter(v=>v[0]!=='id').map( (entry) => {
          const [key, value] = entry
          const [state, setState] = useState(value)
          return <EditableInfo key={key} dbRef={key} label={key} state={state} setState={setState} />
        })}
      </section>
      <form onSubmit={(e)=>e.preventDefault()}
        className="flex justify-evenly"
      >
        <div className="flex flex-col border">
          <input type="text"
              id={nameId}
              className="w-full lowercase text-sm h-full pt-1 text-center"
              placeholder="Name"
              onChange={ (e)=>changeEntry(e, "name") }
              />
          <label
          className="text-gray-600 text-sm text-center"
          htmlFor={nameId}>
            Name
          </label>
        </div>
        <div className="flex flex-col border">
          <input type="number"
              id={minId}
              className="w-full lowercase text-sm h-full pt-1 text-center"
              placeholder="min"
              onChange={ (e)=>changeEntry(e, "min") }
              />
          <label
          className="text-gray-600 text-sm text-center"
          htmlFor={minId}>
            Min
          </label>
        </div>
        <div className="flex flex-col border">
          <input type="number"
              id={maxId}
              className="w-full lowercase text-sm h-full pt-1 text-center"
              placeholder="max"
              onChange={ (e)=>changeEntry(e, "max") }
              />
          <label
          className="text-gray-600 text-sm text-center"
          htmlFor={maxId}>
            max
          </label>
        </div>
        <button
          className="flex justify-center items-center p-2 bg-green-200 rounded-r-lg"
          >+</button> 
      </form>
      <section className="p-2">
        {entries.map(entry=>{
          return (
            <div className="flex gap-2 justify-between" 
              key={entry.id}
              >
              <div>{entry.name}</div>
              <div>{entry.min}</div>
              <div>{entry.max}</div>
              <div>{entry.result}</div>
            </div>
          ) 
        })
        }
      </section>
    <div>
      <pre>
        {JSON.stringify(newEntry)}
      </pre>
    </div>
    </div>
  )
}