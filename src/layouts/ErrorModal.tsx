
export function ErrorModal({message}:{message:string}) {

  return (
    
    <div className="mt-5 p-4 bg-yellow-100 text-center">
      {message}
    </div>
  )
}