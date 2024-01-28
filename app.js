const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/hotel-booking-app', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Hotel schema
const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  rooms: [
    {
      number: Number,
      price: Number,
    },
  ],
});

const Hotel = mongoose.model('Hotel', hotelSchema);

// Seed data - add a few hotels with rooms
const seedData = [
  {
    name: 'Luxury Hotel',
    location: 'City Center',
    rooms: [
      { number: 101, price: 200 },
      { number: 102, price: 250 },
    ],
  },
  {
    name: 'Comfort Inn',
    location: 'Suburb Area',
    rooms: [
      { number: 201, price: 150 },
      { number: 202, price: 180 },
    ],
  },
];

Hotel.insertMany(seedData)
  .then(() => {
    console.log('Seed data added successfully');
  })
  .catch((error) => {
    console.error('Error seeding data:', error);
  });

app.get('/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Add this route to handle bookings
app.post('/bookings', async (req, res) => {
    try {
      const { hotelId, roomNumber } = req.body;
  
      // Implement your booking logic here
      // For simplicity, let's assume you have a Hotel model with a bookings array
      const hotel = await Hotel.findById(hotelId);
      const room = hotel.rooms.find((r) => r.number === roomNumber);
  
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      // Check if the room is already booked (add your own logic)
      if (room.isBooked) {
        return res.status(400).json({ message: 'Room already booked' });
      }
  
      // Record the booking (add your own logic)
      room.isBooked = true;
      await hotel.save();
  
      res.status(200).json({ message: 'Booking successful' });
    } catch (error) {
      console.error('Error handling booking:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
