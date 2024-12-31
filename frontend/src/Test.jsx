import React, { useState } from 'react';

// SearchBar2 Component
const SearchBar2 = ({ onSearch }) => {
  const [departCode, setDepartCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (departCode.trim() === '') {
      alert('Please enter a departure code');
      return;
    }
    onSearch(departCode); // Pass the departCode directly
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="Depart Code"
        value={departCode}
        onChange={(e) => setDepartCode(e.target.value)}
        className="p-2 border rounded text-black"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Search Flights
      </button>
    </form>
  );
};

// Test Component
function Test() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (departCode) => {
    setLoading(true);
    setError(null); // Reset error message on new search
    try {
      // Construct the URL with the departCode parameter
      const url = `http://localhost:8000/flights/search?depart_location.airportcode=${departCode}`;

      console.log('Making request to:', url); // Debugging line

      const response = await fetch(url);

      // Get raw response as text
      const text = await response.text();  // Get response as text
      console.log('Raw response:', text);

      // Check if the response is valid JSON before parsing
      const data = JSON.parse(text);  // Try parsing the raw text as JSON
      console.log('Fetched data:', data); // Debugging line

      // If no flights are found, set an empty array
      if (data.length === 0) {
        setFlights([]);
        setError('No flights found.');
      } else {
        setFlights(data);
      }
    } catch (error) {
      console.error('Error fetching flight data:', error); // Debugging line
      setError('Error fetching flight data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <SearchBar2 onSearch={handleSearch} />

      {loading && <p>Loading...</p>}

      <div className="mt-4">
        {error && <p className="text-red-500">{error}</p>}

        {flights.length > 0 ? (
          <ul>
            {flights.map((flight, index) => (
              <li key={index} className="mb-2">
                <div><strong>Price:</strong> ${flight.price_flight}</div>
                <div><strong>Flight Number:</strong> {flight.flightnumber}</div>
                <div><strong>Departure Time:</strong> {flight.depart_time}</div>
                <div><strong>Return Time:</strong> {flight.return_time}</div>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No flights found</p>
        )}
      </div>
    </div>
  );
}

export default Test;
