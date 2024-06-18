import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Nav/Nav';
import './UserProfile.css';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='user-profile'>
      <Navbar />
      <h2>User Profile</h2>
      {userProfile && (
        <div>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
          <h3>Booked Flights</h3>
          {userProfile.bookedFlights.length > 0 ? (
            <ul>
              {userProfile.bookedFlights.map((flight, index) => (
                <li key={index}>
                  Booking ID: {flight.bookingId}, Name: {flight.name}, Age: {flight.age}, Gender: {flight.gender}
                </li>
              ))}
            </ul>
          ) : (
            <p>No booked flights found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
