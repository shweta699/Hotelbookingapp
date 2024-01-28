import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HotelDetails.css'; 
import RoomDetails from './RoomDetails';
import { BrowserRouter as Router,Routes,Route, Link } from 'react-router-dom';

// const RoomDetails = ({ room, onBook }) => (
//   <div>
//     <p>Room Number: {room.number}</p>
//     <p>Price: ${room.price}/night</p>
//     <button onClick={() => onBook(room.number)}>Book Now</button>
//   </div>
// );

const HotelDetails = ({ hotel, onBook }) => (
  <div className="hotel-details">
    <h2>{hotel.name}</h2>
    <p>Location: {hotel.location}</p>
    <h3>Rooms:</h3>
    {hotel.rooms.map((room) => (
      <RoomDetails key={room.number} room={room} onBook={onBook} />
    ))}
    <hr />
  </div>
);

const Home = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://localhost:3001/hotels');
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleBook = async (hotelId, roomNumber) => {
    try {
      const response = await axios.post('http://localhost:3001/bookings', {
        hotelId,
        roomNumber,
      });

      console.log(response.data.message); // Success message from the backend
      // Optionally, you can fetch hotels again to update the UI after booking
      fetchHotels();
    } catch (error) {
      console.error('Error booking room:', error);
      // Handle the error as needed
    }
  };

  return (
    <div>
      <h1>Hotel Booking App</h1>
      {hotels.map((hotel) => (
        <HotelDetails key={hotel._id} hotel={hotel} onBook={(roomNumber) => handleBook(hotel._id, roomNumber)} />
      ))}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};
export default App;

