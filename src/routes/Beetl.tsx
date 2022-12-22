import { useParams } from "react-router-dom";


export function Beetl() {

  // fetch beetl data with this later
  // for now conceptual implementation with feedback
  // in route (which is ugly for the Sum)
  const { beetlUUID, targetSum } = useParams()

  return (
    <>
    <div className=""> 
      <div className="bg-gray-100 p-2">
        <pre>UUID: { beetlUUID }</pre>
        <pre>SUM: { targetSum }</pre>
      </div>
    </div>
    </>
  )

}