import axios from "axios";
import { useState } from "react";
import { LoaderFunctionArgs, Navigate, useLoaderData } from "react-router-dom";
import { EditableInfo } from "../components/beetl/EditableDiv";

import { BeetleType, EntryType } from "../types";
import { baseURL } from "../utils";

export async function beetlLoader({params}:LoaderFunctionArgs) {

  try {
    const beetl = await axios.get(baseURL + `beetls/${params.id}`)
    const entries = await axios.get(baseURL + `entries`, {params: {beetlsId:params.id}})
    return [beetl.data, entries.data]
  } catch (error) { throw error }
}

type BeetlResponse = [BeetleType, EntryType[]]


export function BeetlErr() {

  return <Navigate to={'/'} state={{error:"Something went wrong..."}} />
}


export function Beetl() {

  const [beetl, entries]:BeetlResponse = useLoaderData() as BeetlResponse


  return (
    <div> 
      <section className="flex flex-col gap-3 p-5">
        {Object.entries(beetl).filter(v=>v[0]!=='id').map( (entry) => {
          const [key, value] = entry
          const [state, setState] = useState(value)
          return <EditableInfo key={key} dbRef={key} label={key} state={state} setState={setState} />
        })}
      </section>
      {/* <div className="bg-red-100 p-2">
        {entries.map(entry=>{
          return (
            <div className="" key={entry.id}>
              <div>{entry.id}</div>
              <div>{entry.min}</div>
              <div>{entry.max}</div>
              <div>{entry.name}</div>
            </div>
          ) 
        })
        }
      </div> */}
    </div>
  )
}