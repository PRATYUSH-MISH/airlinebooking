import React, { useEffect, useState } from 'react';
import Navbar from './Nav';
import IMG2 from '../static/img/plane3.1.jpg';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [tripType, setTripType] = useState('1');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [seat, setSeat] = useState('economy');
  const [data, setData] = useState([]);
  const [filteredOrigins, setFilteredOrigins] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

  const navigate = useNavigate();

  const minDate = '2023-01-01';
  const maxDate = '2023-12-31';

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetch('http://localhost:8000/things')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredOrigins(data);
        setFilteredDestinations(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form submitted with data:', {
      tripType,
      origin,
      destination,
      departDate,
      returnDate,
      seat,
    });

    try {
      const response = await fetch('http://localhost:8000/book/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripType,
          origin,
          destination,
          departDate,
          returnDate,
          seat,
        }),
      });

      if (response.ok) {
        navigate('/bookings'); // Redirect to bookings.jsx
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert('Error submitting booking. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="home">
        <section className="section first-section" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)), url(${IMG2})` }}>
          <div className="banner-div">
            <div className="banner">
              <h1 className="banner-text">Book Domestic and International Flight Tickets</h1>
            </div>
          </div>
          <div className="search-flight">
            <div className="container">
              <form className="search-flight-form" onSubmit={handleSubmit}>
                <div className="align-items-center">
                  <div className="search-flight-form-data">
                    <div className="input-row" style={{ display: 'flex' }}>
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="radio"
                            className="form-check-input trip-type"
                            id="one-way"
                            name="tripType"
                            value="1"
                            checked={tripType === '1'}
                            onChange={() => setTripType('1')}
                          />
                          One-way
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="radio"
                            className="form-check-input trip-type"
                            id="round-trip"
                            name="tripType"
                            value="2"
                            checked={tripType === '2'}
                            onChange={() => setTripType('2')}
                          />
                          Round Trip
                        </label>
                      </div>
                    </div>
                    <div className="input-row">
                      <label htmlFor="flight-from">From: </label>
                      <input
                        type="text"
                        name="origin"
                        placeholder="From"
                        id="flight-from"
                        className="form-control mr-sm-3"
                        value={origin}
                        onChange={(e) => {
                          setOrigin(e.target.value);
                          setShowOriginSuggestions(true);
                          setFilteredOrigins(data.filter(item => item.city.toLowerCase().includes(e.target.value.toLowerCase())));
                        }}
                        autoComplete="off"
                        onFocus={() => setShowOriginSuggestions(true)}
                      />
                      {showOriginSuggestions && (
                        <div className="suggestions">
                          {filteredOrigins.map(item => (
                            <div
                              key={item._id}
                              className="suggestion"
                              onClick={() => {
                                setOrigin(item.city);
                                setShowOriginSuggestions(false);
                              }}
                            >
                              {item.city}, {item.country}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="input-row">
                      <label htmlFor="flight-to">To: </label>
                      <input
                        type="text"
                        name="destination"
                        placeholder="To"
                        id="flight-to"
                        className="form-control mr-sm-3"
                        value={destination}
                        onChange={(e) => {
                          setDestination(e.target.value);
                          setShowDestinationSuggestions(true);
                          setFilteredDestinations(data.filter(item => item.city.toLowerCase().includes(e.target.value.toLowerCase())));
                        }}
                        autoComplete="off"
                        onFocus={() => setShowDestinationSuggestions(true)}
                      />
                      {showDestinationSuggestions && (
                        <div className="suggestions">
                          {filteredDestinations.map(item => (
                            <div
                              key={item._id}
                              className="suggestion"
                              onClick={() => {
                                setDestination(item.city);
                                setShowDestinationSuggestions(false);
                              }}
                            >
                              {item.city}, {item.country}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="input-row">
                      <label htmlFor="depart_date">Departure Date: </label>
                      <input
                        type="date"
                        name="departDate"
                        min={minDate}
                        max={maxDate}
                        id="depart_date"
                        placeholder="Date"
                        className="form-control mr-sm-2"
                        value={departDate}
                        onChange={(e) => setDepartDate(e.target.value)}
                      />
                    </div>
                    <div className="input-row">
                      <label htmlFor="return_date">Return Date: </label>
                      <input
                        type="date"
                        name="returnDate"
                        min={minDate}
                        max={maxDate}
                        id="return_date"
                        placeholder="Date"
                        className="form-control mr-sm-2"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        disabled={tripType !== '2'}
                      />
                    </div>
                    <div className="input-row">
                      <label htmlFor="seat_class">Class: </label>
                      <select
                        name="seat"
                        id="SeatType"
                        className="form-control mr-sm-2 selectpicker"
                        value={seat}
                        onChange={(e) => setSeat(e.target.value)}
                      >
                        <option value="economy">Economy</option>
                        <option value="business">Business</option>
                        <option value="first">First</option>
                      </select>
                    </div>
                    <div className="input-row">
                      <button type="submit" className="btn btn-danger">Search Flight</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;









