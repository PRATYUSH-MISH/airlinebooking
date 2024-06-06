import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './UserProfile.css';
//import FlightCard from './FlightCard';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('User not authenticated');
        setLoading(false);
        navigate('/login'); // Redirect to login if not authenticated

        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.data.user) {
          throw new Error('Failed to fetch user profile');
        }

        setUserProfile(response.data.user);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {userProfile && (
        <div>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
          {/* You can add more user profile fields here */}
        </div>
      )}
    </div>
  );
  
};

export default UserProfile;
