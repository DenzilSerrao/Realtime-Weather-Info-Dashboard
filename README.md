# WeatherView Application

A beautiful weather application that allows users to view current weather conditions and forecasts for locations around the world.

## Features

- Select locations from a dropdown menu
- View current weather conditions including temperature, humidity, wind speed, and more
- See a 5-day weather forecast
- Responsive design that works on all device sizes
- Beautiful UI with animations and transitions based on weather conditions

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for bundling and development

### Backend
- Java with Spring Boot
- Maven for dependency management
- RESTful API architecture
- Integration with OpenWeatherMap API

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Java Development Kit (JDK) 17 or higher
- Maven 3.6 or higher

### Frontend Setup

1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npm run dev
```

The application will be available at http://localhost:5173

### Backend Setup

1. Navigate to the backend directory:
```
cd backend
```

2. Set your OpenWeatherMap API key in `src/main/resources/application.properties`:
```
openweather.api.key=YOUR_API_KEY_HERE
```

3. Build and run the application:
```
mvn spring-boot:run
```

The backend server will start on http://localhost:8080

## API Endpoints

- `/api/weather/current?city={cityName}` - Get current weather for a city
- `/api/weather/forecast?city={cityName}` - Get 5-day forecast for a city

## License

This project is licensed under the MIT License - see the LICENSE file for details.