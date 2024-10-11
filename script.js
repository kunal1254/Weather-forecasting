const apiKey = 'YOUR_API_KEY';  // Replace with your API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    getWeatherData(city);
});

function getWeatherData(city) {
    const apiUrl = `https//api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    // const api = www.google.com

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        displayCurrentWeather(data);
    })
    .catch(error => {
        console.error("Error fetching weather data:", error);
    });
}

function displayCurrentWeather(data) {
    const cityName = document.getElementById('cityName');
    const temp = document.getElementById('temp');
    const humidity = document.getElementById('humidity');
    const condition = document.getElementById('condition');
    
    cityName.textContent = data.name;
    temp.textContent = data.main.temp;
    humidity.textContent = data.main.humidity;
    condition.textContent = data.weather[0].description;
}


function getWeatherForecast(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        displayWeatherForecast(data);
    })
    .catch(error => {
        console.error('Error fetching forecast:', error);
    });
}

function displayWeatherForecast(data) {
    const forecastContainer = document.getElementById('forecastData');
    forecastContainer.innerHTML = '';  // Clear previous forecast data
    
    // Loop through the forecast data (every 3 hours)
    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        
        const forecastDiv = document.createElement('div');
        forecastDiv.classList.add('forecast-item');
        
        forecastDiv.innerHTML = `
            <p><strong>Date:</strong> ${forecast.dt_txt}</p>
            <p><strong>Temp:</strong> ${forecast.main.temp} °C</p>
            <p><strong>Condition:</strong> ${forecast.weather[0].description}</p>
        `;
        
        forecastContainer.appendChild(forecastDiv);
    }
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherDataByCoordinates(lat, lon);
    });
}

function getWeatherDataByCoordinates(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        displayCurrentWeather(data);
    })
    .catch(error => {
        console.error("Error fetching weather data:", error);
    });
}