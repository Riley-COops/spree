import React, { useState, useEffect } from 'react';
import { fetchUserProfile, updateUserProfile } from '../endpoints/auth';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    user:
    {email: '',
    first_name: '',
    last_name: '',
  },

    telephone: '',
    location: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const data = await fetchUserProfile();
        console.log("Fetched profile data:", data);
        setProfile(data); // Ensure the API returns all required fields
        setLoading(false);
      } catch (error) {
        setError('Failed to load profile');
        setLoading(false);
      }
    }

    loadUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'telephone' || name === 'location') {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        telephone: profile.telephone,
        location: profile.location,
      };
      await updateUserProfile(updateData);
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Profile</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
      <div className="mb-2"><strong>Email:</strong> {profile.user?.email}</div>
      <div className="mb-2"><strong>First Name:</strong> {profile.user?.first_name}</div>
      <div className="mb-2"><strong>Last Name:</strong> {profile.user?.last_name}</div>


        {/* Telephone (editable) */}
        <div className="mb-4">
          <label className="block text-gray-700">Telephone</label>
          <input
            type="text"
            name="telephone"
            value={profile.telephone}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location (editable) */}
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
