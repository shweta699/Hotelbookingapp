import React, { useState } from 'react';

const RoomDetails = ({ room, onBook }) => {
  const [showForm, setShowForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    age:'',
    paymentMethod: '',
    // Add more booking details as needed
  });
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const handleBookClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add validation logic if needed

    // Pass booking details to the onBook function
    onBook(room.number, bookingDetails);

    // Reset form and hide it
    setBookingDetails({
      name: '',
      email: '',
      age:'',
      paymentMethod: '',
    });
    setShowForm(false);
    setIsBookingConfirmed(true);
  };

  return (
    <div className="room-details">
      <p>Room Number: {room.number}</p>
      <p>Price: ${room.price}/night</p>
      <button onClick={handleBookClick}>Book Now</button>

      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={bookingDetails.name}
            onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            value={bookingDetails.email}
            onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
            required
          />

<label>Age:</label>
          <input
            type="age"
            value={bookingDetails.age}
            onChange={(e) => setBookingDetails({ ...bookingDetails, age: e.target.value })}
            required
          />
          <label>Payment Method:</label>
          <select
            value={bookingDetails.paymentMethod}
            onChange={(e) => setBookingDetails({ ...bookingDetails, paymentMethod: e.target.value })}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="gpay">Google Pay</option>
            <option value="phonepay">PhonePe</option>
            <option value="paytm">Paytm</option>
            <option value="netbanking">Net Banking</option>
            <option value="cash">Cash</option>
            {/* Add more payment options as needed */}
          </select>
          {/* Add more form fields for booking details as needed */}

          <button type="submit">Confirm Booking</button>
        </form>
      )}
      {isBookingConfirmed && (
        <div className="confirmation-message">
          <p>Booking Confirmed! Thank you for choosing us.</p>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
