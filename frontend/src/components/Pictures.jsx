import React from "react";
import ny from "../assets/ny.svg";
import houston from "../assets/houston.svg";
import vegas from "../assets/vegas.svg";
import miami from "../assets/miami.svg";

function Pictures() {
  return (
    <div className="w-[700px] h-[600px] grid grid-cols-2 gap-2 gap-y-[1px] justify-items-center">
      <img className="w-full h-full object-contain" src={ny} alt="New York" />
      <img className="w-full h-full object-contain" src={houston} alt="Houston" />
      <img className="w-full h-full object-contain" src={vegas} alt="Vegas" />
      <img className="w-full h-full object-contain" src={miami} alt="Miami" />
    </div>
  );
}

export default Pictures;
