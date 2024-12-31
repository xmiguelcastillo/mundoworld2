import React from "react";
import '../App.css'
import StatusButton from "./StatusButton";
function StatusBar() {
  return (
    <div className="border-4 border-black rounded-lg w-full max-w-[1000px] bg-[#07bcd4] flex p-2 mt-2 space-x-2">
      {/* Departure City */}
      <div className="flex flex-col  w-1/2 min-w-0">
        <div className="text-shadow text-white font-bold text-sm mb-1">Confirmation ID</div>
        <input
          type="text"
          name="departure_city"
          className="p-1 text-sm border-4 text-black border-black rounded-md"
          placeholder="Enter departure city"
          required
        />
      </div>

      {/* Destination City */}
      <div className="flex flex-col w-1/2 min-w-0">
        <div className="text-shadow text-white font-bold text-sm mb-1">Last Name</div>
        <input
          type="text"
          name="arrival_city"
          className="p-1 text-sm text-black border-4 border-black rounded-md"
          placeholder="Enter destination city"
        />
      </div>
      <StatusButton />
    </div >
  );
}

export default StatusBar;
