import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database'; // Import needed Firebase functions
import { database } from './firebase'; // Correct Firebase import

function App() {
  const [sensorData, setSensorData] = useState({});

  useEffect(() => {
    // Firebase reference for the DHT11 sensor data
    const sensorRef = ref(database, 'Sensors/DHT11'); // Use 'ref' to point to the database path
    
    // Set up Firebase real-time listener
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(data);
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <h1>Sensor Data</h1>
      <p>Humidity: {sensorData.Humidity}</p>
      <p>Temperature: {sensorData.Temperature}</p>
    </div>
  );
}

export default App;
