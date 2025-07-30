const apiKey = 'fba2021fd0b3919404ca563482e1b16f'; // OpenWeatherMap API key

const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const latInput = document.getElementById('latInput');
const lonInput = document.getElementById('lonInput');
const weatherResult = document.getElementById('weatherResult');
const cityModeDiv = document.getElementById('cityMode');
const coordsModeDiv = document.getElementById('coordsMode');

// Toggle input fields based on mode
form.mode.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'city' && radio.checked) {
            cityModeDiv.style.display = '';
            coordsModeDiv.style.display = 'none';
        } else if (radio.value === 'coords' && radio.checked) {
            cityModeDiv.style.display = 'none';
            coordsModeDiv.style.display = '';
        }
    });
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    weatherResult.textContent = 'Loading...';
    let url = '';
    if (form.mode.value === 'city') {
        const city = cityInput.value.trim();
        if (!city) {
            weatherResult.textContent = 'Please enter a city name.';
            return;
        }
        url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    } else {
        const lat = latInput.value.trim();
        const lon = lonInput.value.trim();
        if (!lat || !lon) {
            weatherResult.textContent = 'Please enter both latitude and longitude.';
            return;
        }
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Location not found');
        const data = await response.json();
        weatherResult.innerHTML = `
            <strong>${data.name || 'Unknown Location'}, ${data.sys?.country || ''}</strong><br>
            <span style="font-size:2em;">${Math.round(data.main.temp)}°C</span><br>
            ${data.weather[0].main} (${data.weather[0].description})<br>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
            <br>Humidity: ${data.main.humidity}%<br>Wind: ${data.wind.speed} m/s
        `;
    } catch (error) {
        weatherResult.textContent = error.message;
    }
});
