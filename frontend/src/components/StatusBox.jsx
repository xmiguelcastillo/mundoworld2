import React from "react"
import "../App.css"
import PurchaseButton from "./PurchaseButton"
import ResultTime from "./ResultTime"
function StatusBox() {
  return (
    <div>

      <div className="bg-red-800 flex flex-row w-[1000px] h-[200px] border-black rounded-xl border-4 mt-3" >

        <div className="flex flex-col bg-sky-600 h-full w-1/5">
          <div className="w-full text-shadow h-1/2 bg-yellow-500 justify-center flex items-center text-center">spirit</div>
          <div className="w-full text-shadow h-1/2 bg-green-600 justify-center flex items-center text-center">spirit</div>
        </div>

        <div className="bg-indigo-800 h-full w-3/5">
          < ResultTime />
        </div>
        <div className="bg-sky-600 h-full w-1/5">
          <div className="w-full text-shadow h-1/2 bg-yellow-500 justify-center flex items-center text-center">Price</div>
          <PurchaseButton />
        </div>
      </div>
    </div>
  )
}
export default StatusBox
