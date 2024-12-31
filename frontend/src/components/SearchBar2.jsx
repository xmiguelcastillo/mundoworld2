// SearchBar2.js
import React, { useState } from 'react';

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

export default SearchBar2;
