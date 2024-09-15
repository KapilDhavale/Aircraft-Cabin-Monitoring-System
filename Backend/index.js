const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const SensorDataModel = require('./model'); // Import SensorDataModel from model.js

const app = express();

// Use the CORS middleware to allow all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());

// Endpoint to receive data via curl request
app.post('/data', async (req, res) => {
  const { sensorId, humidity, temperature } = req.body;

  // Validate the input
  if (!sensorId || humidity === undefined || temperature === undefined) {
    return res.status(400).send('Invalid data format.');
  }

  try {
    // Use SensorDataModel to update data in Firebase
    await SensorDataModel.updateData(sensorId, humidity, temperature);
    res.status(200).send('Data saved successfully.');
  } catch (error) {
    res.status(500).send('Error saving data: ' + error.message);
  }
});

// Start server
const port = 5000; // Use a different port if needed
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
