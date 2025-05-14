import React, { useState } from 'react';
import { useNavigate,useLocation, Link } from 'react-router-dom'; // <-- import this
import { loginUser } from '../endpoints/auth';

const Login = () => {
  const location = useLocation();
  const from = location.state?.from || '/';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // <-- create navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const loginData = { username, password };

    try {
        const result = await loginUser(loginData);
        console.log('Login successful:', result);
      
        // Save tokens in localStorage
        localStorage.setItem('accessToken', result.access);
        localStorage.setItem('refreshToken', result.refresh);
      
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate(from);
        }, 1000);
      } catch (err) {
        console.error('Login failed:', err.message);
        if (err.message.includes('401')) {
          setError('Invalid username or password.');
        } else {
          setError('Login failed. Please try again later.');
        }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 overflow-hidden">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
        {/* {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-4">{success}</p>} */}
        <p className="text-bold m-3">
                  Do not have an account?{' '}
                  <Link className="color-blue" to="/signup">
                    Register
                  </Link>
                </p>
      </div>
    </div>
  );
};

export default Login;
