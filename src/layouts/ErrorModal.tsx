
type props = {
  message:string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

export function ErrorModal({message, setMessage}: props) {

  return (

    <div className="mt-5 p-4 bg-yellow-100 text-center">
      {message}
      <button
        onClick={(e)=>{ setMessage('') }}
        className="border px-1 bg-red-50 hover:bg-emerald-100"
        >
        okay
      </button>
    </div>
  )
}