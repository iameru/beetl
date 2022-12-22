import { getUUID } from "../../api"

export function CreateBeetl() {

  return (
    <>
      <div className="flex border rounded divide-x">
        <div className="divide-y">
          <input
            value={getUUID()}
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
        <button
        className="p-2"
        >
          GO!
        </button>
      </div>
    </>
  )
}
