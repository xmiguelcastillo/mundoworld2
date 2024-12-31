import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function TopBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  // Check if the user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Optionally, retrieve and show the user's email or name from localStorage or API
      const storedEmail = localStorage.getItem('userEmail'); // Assuming you stored it during login
      setUserEmail(storedEmail || 'User');
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('userEmail'); // Optionally, remove user data
    setIsAuthenticated(false); // Update authentication state
    setUserEmail('');
    navigate('/register'); // Redirect to the register page
  };

  return (
    <div className='flex flex-row h-10 mb-8 w-full max-w-[700px] font-light rounded-lg text-md gap-2'>
      <Link to="/airport">
        <div className='text-white text-shadow text-[5px] bg-[#B1FAFF] border-4 rounded-md border-black flex justify-center items-center flex-1'>
          Status
        </div>
      </Link>
      <Link to="/">
        <div className='text-white text-shadow text-[5px] bg-[#B1FAFF] border-4 rounded-md border-black flex justify-center items-center flex-1'>
          Home
        </div>
      </Link>
      <Link to="/results">
        <div className='text-white text-shadow text-[5px] bg-[#B1FAFF] border-4 rounded-md border-black flex justify-center items-center flex-1'>
          Flights
        </div>
      </Link>



      <Link to="/test">
        <div className='text-white text-shadow text-[5px] bg-[#B1FAFF] border-4 rounded-md border-black flex justify-center items-center flex-1'>
          Test
        </div>
      </Link>


      <div className='text-white text-shadow text-[5px] bg-[#B1FAFF] border-4 rounded-md border-black flex justify-center items-center flex-1'>
        Help
      </div>

      {/* If user is authenticated, show 'Account' and 'Sign Out' */}
      {isAuthenticated ? (
        <>
          <div className='text-white text-shadow text-[5px] bg-[#B1FAFF] border-4 rounded-md border-black flex justify-center items-center flex-1'>
            <span>{userEmail}</span>
          </div>
          <div
            onClick={handleLogout}
            className='text-white text-shadow text-[5px] bg-[#B1FAFF] border-4 rounded-md border-black flex justify-center items-center flex-1 cursor-pointer'
          >
            Sign Out
          </div>
        </>
      ) : (
        <>
          <Link to="/register">
            <div className='text-white text-shadow text-[5px] bg-[#B1FAFF] border-4 rounded-md border-black flex justify-center items-center flex-1'>
              Register
            </div>
          </Link>
          <Link to="/login">
            <div className='text-white text-shadow text-[5px] bg-[#B1FAFF] border-4 rounded-md border-black flex justify-center items-center flex-1'>
              Login
            </div>
          </Link>
        </>
      )}
    </div>
  );
}

export default TopBar;
