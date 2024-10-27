# Real-Time Weather Monitoring System

A comprehensive weather monitoring application built using the PERN stack (PostgreSQL, Express, React, Node.js). The system integrates with OpenWeatherMap API to provide real-time weather data.

## Features

- Real-time weather monitoring for multiple cities
- Support for both Celsius and Fahrenheit units
- PostgreSQL database for persistent data storage
- Responsive React-based user interface

## Design Choices

### Architecture
- Modular design with separate backend and frontend components
- Well-structured codebase for enhanced maintainability
- RESTful API implementation

### Technology Stack
- **Database**: PostgreSQL for reliable data persistence
- **Backend**: Express.js for robust API development
- **Frontend**: React for dynamic user interface
- **API Integration**: OpenWeatherMap API for weather data
- **ORM**: Sequelize for database operations

## Prerequisites

Before installation, ensure you have the following installed:
- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- NPM (Node Package Manager)

## Installation

### 1. Clone the Repository
```bash
git clone
cd weather-monitoring-system
```

### 2. Database Setup
Ensure PostgreSQL is running on your system and create a new database. Configure the environment variables by creating a `.env` file in the project root:

```plaintext
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
OPENWEATHER_API_KEY=your_openweather_api_key
```

**Note**: Replace the placeholder values with your actual database credentials and OpenWeatherMap API key.

### 3. Install Dependencies
While in the backend folder
```bash
npm install
```
While in the fronted folder
```bash
npm install
```

### 4. Database Initialization
Run the database setup script to preload initial city data:
```bash
node backend/scripts/weatherRealTimeTable.populate.js
```

### 5. Launch the Application
Start the backend server:
```bash
npm start
```

Start the frontend development server:
```bash
npm run dev
```

## Usage

1. Access the application through your web browser at `http://localhost:5173/`
2. View real-time weather data for monitored cities
3. Toggle between Celsius and Fahrenheit temperature units

## Security Features

- Environment variable usage for sensitive data protection
- Input validation to prevent SQL injection
- Secure API key management

## Dependencies

### Core Dependencies
- Node.js - JavaScript runtime
- PostgreSQL - Database system
- Express - Backend framework
- React - Frontend framework
- Sequelize - ORM for database operations

### Additional Packages
- dotenv - Environment variable management
- Additional dependencies are listed in `package.json`

## Database Schema

The application uses the following main tables:
- weatherRealTime: Records real-time weather measurements
- weatherSummary: Maintains the daily summaries of cities

