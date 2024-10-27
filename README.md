Introduction
This repository contains the Real-Time Weather Monitoring System, developed as part of the Zeotap internship assessment. The application is built using the PERN stack (PostgreSQL, Express, React, Node.js) and integrates with the OpenWeatherMap API to display real-time city weather data, allowing users to set temperature thresholds and receive alerts based on weather conditions.

Design Choices
Architecture: Modular design with a well-structured backend and React-based frontend for maintainability.
Data Storage: Uses PostgreSQL for storing real-time weather data.
API Integration: Utilizes the OpenWeatherMap API to fetch weather forecasts for specified cities.
Threshold Alerts: Users can set temperature thresholds (in Celsius or Fahrenheit) with configurable alerts.
Build Instructions
Ensure Node.js (v16+), PostgreSQL (v13+), and NPM are installed on your system.

1. Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/weather-monitoring-system
cd weather-monitoring-system
2. Set Up the Database
Ensure PostgreSQL is running locally.
Create a new database and update your .env file with the required PostgreSQL credentials:
plaintext
Copy code
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
OPENWEATHER_API_KEY=your_openweather_api_key
Note: Replace your_openweather_api_key with your OpenWeatherMap API key.
3. Install Dependencies
From the project root, install dependencies:

bash
Copy code
npm install
4. Run Initial Database Setup Script
To preload the database with initial city data, execute the setup script:

bash
Copy code
npm run setup-db
This script seeds the database with essential data for the cities being monitored.

5. Start the Application
Start the backend server:

bash
Copy code
npm start
Start the frontend server:

bash
Copy code
npm run dev
Dependencies
Node.js: JavaScript runtime.
PostgreSQL: Database for persistent data storage.
Sequelize: ORM for handling database interactions.
React: Frontend framework.
Express: Backend framework.
dotenv: For environment variables.
Other dependencies are listed in package.json.

Usage
Access the application at localhost:3000.
The homepage displays current weather data for each city in the database.
Users can configure temperature thresholds and select alert preferences in Celsius or Fahrenheit.
Security and Performance
Environment Variables: Sensitive data (e.g., API keys, database credentials) are stored in environment variables.
Optimized Database Queries: Indexes are implemented for frequently queried columns to improve performance.
Data Validation: Input data is validated to prevent injection attacks