import React from "react";
import '../App.css'
function Footer() {
  return (
    <div className="button-container flex flex-row justify-around max-w-7xl bg-[#07bcd4] mx-auto border-4 border-black rounded-md p-4">
      {/* First Section: Our Products */}
      <div className="button-section flex flex-col items-center bg-[#07bcd4] p-4 w-1/3 rounded-md">
        <div className="text-shadow button-label text-white font-bold mb-4">Our Products</div>
        <button type="submit" className="styled-button bg-white border-4 border-black p-2 rounded-md mb-2 text-shadow">Flights</button>
        <button type="submit" className="styled-button bg-white border-4 border-black p-2 rounded-md mb-2 text-shadow">Profile</button>
        <button type="submit" className="styled-button bg-white border-4 border-black p-2 rounded-md mb-2 text-shadow">Github</button>
      </div>

      {/* Second Section: Connect */}
      <div className="button-section flex flex-col items-center  p-4 w-1/3 rounded-md">
        <div className="button-label text-shadow text-white font-bold mb-4">Connect</div>
        <button type="submit" className="styled-button bg-white p-2 rounded-md mb-2">Me</button>
      </div>

      {/* Third Section: Other Websites */}
      <div className="button-section flex flex-col items-center  p-4 w-1/3 rounded-md">
        <div className="button-label text-white text-shadow font-bold mb-4">Other Websites</div>
      </div>
    </div >
  );
}

export default Footer;
