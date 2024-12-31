import React, { useEffect, useState } from "react";
import flatpickr from "flatpickr"; // Import flatpickr
import "../App.css";

function SearchBar() {
  const [flights, setFlights] = useState([]);

  const [departFlight, setDepartFlight] = useState([]);
  const [returnFlight, setReturnFlight] = useState([]);
  const [departDate, setDepartDate] = useState([]);
  const [returnDate, setReturnDate] = useState([]);

  useEffect(() => {
    flatpickr("#departure-date", {
      dateFormat: "Y-m-d",
      minDate: "today", // Disable past dates
      onChange: (selectedDates, dateStr) => {
        setFormData((prev) => ({ ...prev, depart_date: dateStr }));
      },
    });

    flatpickr("#return-date", {
      dateFormat: "Y-m-d",
      minDate: "today", // Disable past dates
      onChange: (selectedDates, dateStr) => {
        setFormData((prev) => ({ ...prev, return_date: dateStr }));
      },
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const params = new URLSearchParams(formData).toString();
    try {
      const response = await fetch(`/flights/search/?${params}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched flights:", data); // Debugging log
        setFlights(data); // Ensure this matches the response structure
      } else {
        console.error("Error fetching flights:", response.statusText);
        setFlights([]); // Clear results if there is an error
      }
    } catch (error) {
      console.error("Error fetching flight data:", error);
      setFlights([]);
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="border-4 border-black rounded-lg w-full max-w-[1000px] bg-[#07bcd4] flex p-2 mt-2 space-x-2">
        {/* Departure City */}
        <div className="flex flex-col w-1/5 min-w-0">
          <div className="text-shadow text-white font-bold text-sm mb-1">From</div>
          <select
            name="depart_city"
            className="p-1 text-sm border-4 text-black border-black rounded-md flex-1"
            onChange={handleChange}
          >
            <option value="">Selectdewe City</option>
            <option value="Newarks">Newark</option>
            <option value="Atlanta">Atlanta</option>
            <option value="Los Angeles">Los Angeles</option>
          </select>
        </div>

        {/* Destination City */}
        <div className="flex flex-col w-1/5 min-w-0">
          <div className="text-shadow text-white font-bold text-sm mb-1">To</div>
          <select
            name="return_city"
            className="p-1 text-sm border-4 text-black border-black rounded-md flex-1"
            onChange={handleChange}
          >
            <option value="">Select City</option>
            <option value="Newark">Newark</option>
            <option value="Atlanta">Atlanta</option>
            <option value="Los Angeles">Los Angeles</option>
          </select>
        </div>

        {/* Departure Date */}
        <div className="flex flex-col w-1/5 min-w-0">
          <div className="text-white text-shadow font-bold text-sm mb-1">Depart</div>
          <input
            type="text"
            id="departure-date"
            className="p-1 text-sm border-4 text-black border-black rounded-md"
            placeholder="Depart date"
            readOnly
          />
        </div>

        {/* Return Date */}
        <div className="flex flex-col w-1/5 min-w-0">
          <div className="font-bold text-black text-shadow text-sm mb-1">Return</div>
          <input
            type="text"
            id="return-date"
            className="p-1 text-sm border-4 text-black border-black rounded-md"
            placeholder="Return date"
            readOnly
          />
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            className="bg-black text-white p-2 rounded-md"
            onClick={handleSearch}
          >
            Search Flights
          </button>
        </div>
      </div>

      {/* Flight Results */}
      <div className="mt-4">
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <div key={index} className="border p-2 mb-2 rounded-md bg-white">
              <p><strong>Airline:</strong> {flight.airline}</p>
              <p><strong>From:</strong> {flight.depart_location.city}</p>
              <p><strong>To:</strong> {flight.return_location.city}</p>
              <p><strong>Departure Date:</strong> {flight.depart_date}</p>
              <p><strong>Return Date:</strong> {flight.return_date}</p>
              <p><strong>Price:</strong> ${flight.price_flight}</p>
            </div>
          ))
        ) : (
          <p>No flights found. Try searching with different criteria.</p>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
