import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function LoginBox() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await axios.post('http://localhost:8000/login/', data);
      console.log('User logged in successfully:', response.data);

      // Save the token if available (JWT token in this example)
      localStorage.setItem('token', response.data.token); // Storing the JWT token

      // Redirect to the dashboard or homepage after successful login
      navigate('/'); // Adjust to the correct route you need
    } catch (err) {
      console.error('Error during login:', err);

      if (err.response) {
        // Handle error responses from the server
        const errorData = err.response.data;

        if (errorData.error) {
          // If backend returns a specific error, display it
          setError(errorData.error);
        } else {
          setError('An unknown error occurred.');
        }
      } else if (err.request) {
        // No response from the server (e.g., network issues)
        setError('Network error. Please try again later.');
      } else {
        // For other types of errors (e.g., wrong axios config)
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="border-4 border-black rounded-lg w-full max-w-[300px] p-10 bg-[#07bcd4] flex flex-col justify-center items-center p-2 mt-2 space-x-2">
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
        onClick={handleLogin}
      >
        Login
      </button>

      {/* Link to Registration Page */}
      <div className="mt-4">
        <a href="/register">
          <button className="text-sm text-[#0075FF] font-bold">
            Don't have an account? Register
          </button>
        </a>
      </div>
    </div>
  );
}

export default LoginBox;
