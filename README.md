# Weather App

The Weather App is a simple web application that allows users to check the weather conditions for a specific city. It provides real-time weather data including temperature, description, feels like, humidity, and weather icons.

## Features

- **Weather Data**: The app fetches weather data from the OpenWeatherMap API based on the user's input city name.
- **Dynamic Icons**: Weather icons dynamically change based on the current weather conditions, providing visual representation of the weather.
- **Unit Conversion**: Temperature is displayed in Celsius, and users can easily convert it to Fahrenheit by clicking on the temperature value.
- **Responsive Design**: The app is designed to be responsive and provides a seamless experience across different devices.

## Tech Stack

The Weather App is built using the following technologies:

- **HTML5**
- **CSS3**: Custom CSS styles are used for the app's layout and visual appearance.
- **Javascript(ES6+)**
- **React**: A popular JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client used to make API requests.
- **React Icons**: A library that provides a collection of icons for React applications.
- **OpenWeatherMap API**: An API that provides weather data for locations around the world.

## How to Run the App Locally

To run the Weather App on your local machine, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd weather-app`
3. Install the dependencies: `npm install`
4. Obtain an API key from the OpenWeatherMap website by creating an account.
5. Create a `.env` file in the project root directory and add the following line, replacing `<YOUR_API_KEY>` with your actual API key:

   ```plaintext
   REACT_APP_API_KEY=<YOUR_API_KEY>
   ```

6. Save the file and start the development server: `npm start`
7. Open your web browser and visit `http://localhost:3000` to view the Weather App.

## Challenges Faced

During the production of this Weather App, several challenges were encountered:

- **API Integration**: Integrating with the OpenWeatherMap API and handling the API responses required careful handling of asynchronous operations.
- **Data Formatting**: Formatting the received weather data to display the desired information, such as temperature conversion and icon rendering, required additional logic and mapping.
- **Routing**: Using routing in react to interconnect the two pages of the app: one for the input and the other for displaying the weather.
- **Styling**: Creating an appealing and user-friendly design while ensuring responsiveness across various screen sizes required attention to detail and CSS styling.

Despite these challenges, the Weather App was successfully implemented, providing users with a convenient way to check the weather conditions for any desired location.

Feel free to customize and enhance the Weather App based on your needs and requirements. Happy coding!

---
