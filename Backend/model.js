const admin = require('firebase-admin');

// Initialize Firebase if not already done
if (!admin.apps.length) {
  try {
    const serviceAccount = require('C:/Kapil/Aircraft Cabin Monitoring System/Backend/ServiceAccountKey.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://aircraft-monitoring-syst-dc5dc-default-rtdb.asia-southeast1.firebasedatabase.app"
    });
    console.log('Firebase initialized successfully.');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw new Error('Firebase initialization failed.');
  }
}

const db = admin.database();

class SensorDataModel {
  // Update data for DHT11 sensor
  static async updateData(sensorId, humidity, temperature) {
    try {
      const ref = db.ref(`Sensors/${sensorId}`);
      await ref.update({
        Humidity: humidity,
        Temperature: temperature
      });
      console.log(`Data for sensor ${sensorId} updated successfully.`);
    } catch (error) {
      console.error('Error updating sensor data:', error);
      throw new Error('Sensor data could not be updated.');
    }
  }

  // Retrieve data for a specific sensor
  static async getData(sensorId) {
    try {
      const snapshot = await db.ref(`Sensors/${sensorId}`).once('value');
      return snapshot.val();
    } catch (error) {
      console.error('Error retrieving sensor data:', error);
      throw new Error('Sensor data could not be retrieved.');
    }
  }
}

module.exports = SensorDataModel;
