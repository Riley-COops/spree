import React, { useState } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom'; // Import useNavigate
import { createUser } from '../endpoints/auth';

const Signup = () => {
  const useLocation = useLocation();
  const from = useLocation.state?.from || '/';
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userData = {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    };

    try {
      const response = await createUser(userData);
      alert(response.message || 'Account created successfully!'); 
      setEmail('');
      setFirstName('');
      setLastName('');
      setPassword('');

      // Redirect to the homepage after a short delay
      setTimeout(() => {
        navigate(from);
      }, 1000);
    } catch (err) {
      let message = 'Email alreay used. Please try new email.';
      if (err.message) {
        try {
          const parsed = JSON.parse(err.message.split(' - ')[1]);
          message = parsed.error || parsed.detail || message;
        } catch (parseError) {
          
        }
      }
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 overflow-hidden">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
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
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white py-2 rounded transition ${
              isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
            }`}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-bold m-3">
          Already have an account?
          <Link className="color-blue" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
