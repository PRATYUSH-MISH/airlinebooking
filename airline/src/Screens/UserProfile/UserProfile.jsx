import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Nav/Nav';
import UpdateProfile from './UpdateProfile';
import './UserProfile.css';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(updatedProfile);
    setIsUpdating(false);
  };

  const handleFlightDelete = async (bookingId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('User not authenticated');
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/profile/bookedflights/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUserProfile(prevState => ({
        ...prevState,
        bookedFlights: prevState.bookedFlights.filter(flight => flight.bookingId !== bookingId)
      }));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDownloadTicket=(bookingId)=>{
    navigate(`/tickets/${bookingId}`)
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='user-profile'>
    
      <h2>User Profile</h2>
      {userProfile && (
        <div>
          <button onClick={() => setIsUpdating(true)}>Update Profile</button>
          {isUpdating && (
            <UpdateProfile userProfile={userProfile} onUpdate={handleProfileUpdate} />
          )}
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
          <p>Age: {userProfile.age}</p>
          <h3>Booked Flights</h3>
          {userProfile.bookedFlights.length > 0 ? (
            <ul>
              {userProfile.bookedFlights.map((flight, index) => (
                <li key={index}>
                  Booking ID: {flight.bookingId}, Name: {flight.name}, Age: {flight.age}, Gender: {flight.gender}
                  <button className="delete-button" onClick={() => handleFlightDelete(flight.bookingId)}>Delete</button>
                  <button className="download-button" onClick={() => handleDownloadTicket(flight.bookingId)}>Download Ticket</button>
                </li>
              ))}
            </ul>
          ) : (
              <p className="no-flights">No booked flights found.</p>
          )}
        </div>
      )}
    </div>
  
  );
};

export default UserProfile;


