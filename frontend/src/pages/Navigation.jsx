import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaBell, FaHome, FaBars, FaClipboardList } from 'react-icons/fa';

// import LogoutLink from '../endpoints/Logout';

const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // Check if access token exists
    setIsLoggedIn(!!token); // Set login status based on token presence
  }, []);

  const handleLogout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false); // Update login status
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-black text-white p-4 shadow-lg w-full sticky top-0 z-50">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-2xl md:text-2xl font-bold text-center mb-3 md:mb-0">
          Spree
        </div>

        {/* Hamburger button - visible only on small screens */}
        <div className="md:hidden absolute top-4 right-4">
          <button onClick={toggleDropdown} className="text-white text-2xl focus:outline-none">
            <FaBars />
          </button>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex space-x-10 font-medium">
          <li>
            <Link to="/" className="hover:text-gray-400 transition-colors duration-200">Home</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-gray-400 transition-colors duration-200">Cart</Link>
          </li>
          <li>
            <Link to="#" className="hover:text-gray-400 transition-colors duration-200">Order</Link>
          </li>
          <li>
            <Link to="#" className="hover:text-gray-400 transition-colors duration-200">Notification</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="hover:text-gray-400 transition-colors duration-200">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile dropdown nav links */}
      {isDropdownOpen && (
        <ul className="md:hidden mt-4 flex flex-col gap-3 text-white font-medium px-2">
          <li>
            <Link to="/" onClick={toggleDropdown} className="flex items-center gap-2 hover:text-gray-400 transition-colors duration-200">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/cart" onClick={toggleDropdown} className="flex items-center gap-2 hover:text-gray-400 transition-colors duration-200">
              <FaShoppingCart /> Cart
            </Link>
          </li>
          <li>
            <Link to="#" onClick={toggleDropdown} className="flex items-center gap-2 hover:text-gray-400 transition-colors duration-200">
              <FaClipboardList /> Order
            </Link>
          </li>
          <li>
            <Link to="#" onClick={toggleDropdown} className="flex items-center gap-2 hover:text-gray-400 transition-colors duration-200">
              <FaBell /> Notification
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  toggleDropdown();
                }}
                className="flex items-center gap-2 hover:text-gray-400 transition-colors duration-200"
              >
                <FaUser /> Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" onClick={toggleDropdown} className="flex items-center gap-2 hover:text-gray-400 transition-colors duration-200">
                <FaUser /> Login
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
