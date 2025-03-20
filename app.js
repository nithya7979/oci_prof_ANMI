const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const weatherInfoDiv = document.getElementById('weather-info');
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== 200) {
            weatherInfoDiv.style.display = 'none';
            alert('City not found');
            return;
        }

        const weatherData = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

        weatherInfoDiv.innerHTML = weatherData;
        weatherInfoDiv.style.display = 'block';
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data');
    }
}
