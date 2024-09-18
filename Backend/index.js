const express = require('express');
const cors = require('cors'); // Import the cors package
const SensorDataModel = require('./model'); // Import SensorDataModel from model.js

const app = express();

// Use the CORS middleware to allow all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Use express.json() to parse JSON bodies
app.use(express.json());

// Endpoint to receive data via curl request
app.post('/data', async (req, res) => {
  // Log headers and body for debugging
  console.log('Received headers:', req.headers);
  console.log('Received body:', req.body);

  const { sensorId, humidity, temperature } = req.body;

  // Validate the input
  if (!sensorId || humidity === undefined || temperature === undefined) {
    console.error('Invalid data format:', req.body);
    return res.status(400).send('Invalid data format.');
  }

  try {
    // Use SensorDataModel to update data in Firebase
    await SensorDataModel.updateData(sensorId, humidity, temperature);
    console.log(`Data for sensor ${sensorId} updated successfully.`);
    res.status(200).send('Data saved successfully.');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data: ' + error.message);
  }
});

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
