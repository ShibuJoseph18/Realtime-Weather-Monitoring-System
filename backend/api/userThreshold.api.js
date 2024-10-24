import UserThreshold from '../models/userThreshold.js'; // Import the UserThreshold model
import weatherRealTime from '../models/weatherRealTime.js'; // Import the RealTimeData model

// Function to create a new user threshold
export const createThreshold = async (req, res) => {
  const { userId, city, temperatureThreshold, comparisonType } = req.body;

  // Sync the User model (create table if it doesn't exist)
  await UserThreshold.sync();
  console.log('User table synced.');

  try {
    // Fetch the latest realTimeDataId for the given city
    const cityData = await weatherRealTime.findOne({
      where: { cityname: city }
    });

    if (!cityData) {
      return res.status(404).json({ message: 'City not found or no weather data available for this city.' });
    }

    // Create the threshold using the realTimeDataId fetched from the RealTimeData table
    const threshold = await UserThreshold.create({
      userId,
      realTimeDataId: cityData.id, // Use the realTimeDataId from the fetched record
      temperatureThreshold,
      comparisonType
    });

    res.status(201).json(threshold);
  } catch (error) {
    res.status(500).json({ message: 'Error creating threshold', error });
  }
};
