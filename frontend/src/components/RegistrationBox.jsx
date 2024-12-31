import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import '../App.css';

function RegistrationBox() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = { email, username, password };

    try {
      const response = await axios.post('http://localhost:8000/register/', data);
      console.log('User registered successfully:', response.data);

      // Redirect to the login page after successful registration
      navigate('/login'); // Use navigate to redirect
    } catch (err) {
      console.error('Error during registration:', err);
      if (err.response && err.response.data) {
        // Handle the error response properly
        const errorData = err.response.data;
        setError(Object.values(errorData).flat().join(', ')); // Join array of errors into a string
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="border-4 border-black rounded-lg w-full max-w-[300px] p-10 bg-[#07bcd4] flex flex-col justify-center items-center mt-2 space-x-2">
      {/* First Name */}
      <div className="min-w-0">
        <div className="text-shadow text-white font-bold text-sm mb-3 mt-3">First Name</div>
        <input
          type="text"
          name="first-name"
          className="p-1 text-sm border-4 w-44 text-black border-black rounded-md"
          placeholder="Enter first name"
          required
        />
      </div>

      {/* Last Name */}
      <div className="min-w-0">
        <div className="text-shadow text-white font-bold text-sm mb-3 mt-3">Last Name</div>
        <input
          type="text"
          name="last-name"
          className="p-1 text-sm border-4 w-44 text-black border-black rounded-md"
          placeholder="Enter last name"
          required
        />
      </div>

      {/* Email */}
      <div className="min-w-0">
        <div className="text-shadow text-white font-bold text-sm mb-3 mt-3">Email</div>
        <input
          type="email"
          name="email"
          className="p-1 text-sm border-4 w-44 text-black border-black rounded-md"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Username */}
      <div className="min-w-0">
        <div className="text-shadow text-white font-bold text-sm mb-3 mt-3">Username</div>
        <input
          type="text"
          name="username"
          className="p-1 text-sm border-4 w-44 text-black border-black rounded-md"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      {/* Password */}
      <div className="min-w-0">
        <div className="text-shadow text-white font-bold text-sm mb-3 mt-3">Password</div>
        <input
          type="password"
          name="password"
          className="p-1 text-sm border-4 w-44 text-black border-black rounded-md"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Error Message */}
      {error && <div className="error text-red-500 text-sm mt-2">{error}</div>}

      {/* Submit Button */}
      <button
        className="bg-[#0075FF] text-shadow border-4 mt-3 rounded-lg border-black w-[200px] h-[50px]"
        onClick={handleRegister}
      >
        Register
      </button>

      {/* Link to Sign-In Page */}
      <div className="mt-4">
        <a href="/login">
          <button className="text-sm text-[#0075FF] font-bold">
            Already have an account? Sign in
          </button>
        </a>
      </div>
    </div>
  );
}

export default RegistrationBox;
