# WeatherView Application

WeatherView is a beautiful weather application that allows users to view current weather conditions and a 5-day forecast for locations around the world. The application features a responsive UI with animations and transitions that change based on the weather conditions.

## Features

- Select locations from a dropdown menu
- View current weather details including temperature, humidity, wind speed, and more
- See a 5-day weather forecast
- Multilingual support with dynamic language switching
- Beautiful UI with animations and transitions that reflect weather conditions
- Integrated pipeline for building and running using Maven

## Tech Stack

### Frontend

- **React with TypeScript** – Modern, typed React application
- **Vite** – Fast front-end build tool and development server
- **Tailwind CSS** – Utility-first CSS framework for styling
- **Lucide React** – Icon library for a modern look
- **Azure DevOps** – CI/CD pipeline integrated with Maven for Node.js

### Backend

- **Java with Spring Boot** – Robust backend API for weather data
- **Maven** – Dependency management and build orchestration
- **RESTful API architecture** – Integration with external weather APIs (OpenWeatherMap & WeatherAPI)

### Node.js Integration (Frontend Maven Project)

- **frontend-maven-plugin** – Manages Node.js, runs npm commands, and builds the React project
- **Azure Pipelines** – CI/CD setup that builds the Node.js project using Maven and publishes build artifacts

## Getting Started

### Prerequisites

- Java JDK 11 or higher
- Node.js (managed via the frontend-maven-plugin)
- Maven 3.6+
- An Azure DevOps account for CI/CD (optional)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://your-repo-url.git
   cd Devops
   ```

2. **Build and run the project:**

   - Build the project:
     ```bash
     mvn clean install
     ```
   - Run the frontend:
     ```bash
     mvn clean install -Prun
     ```
   - The frontend will start on `http://localhost:5173/` by default.

3. **Access the application:**
   - Open your browser and navigate to `http://localhost:5173/` to view the WeatherView application.

### Notes

- If you encounter any issues, check the logs for detailed error messages and ensure all prerequisites are installed correctly.
