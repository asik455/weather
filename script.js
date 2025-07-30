const apiKey = 'fba2021fd0b3919404ca563482e1b16f'; // OpenWeatherMap API key

const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) return;
    weatherResult.textContent = 'Loading...';
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        weatherResult.innerHTML = `
            <strong>${data.name}, ${data.sys.country}</strong><br>
            <span style="font-size:2em;">${Math.round(data.main.temp)}°C</span><br>
            ${data.weather[0].main} (${data.weather[0].description})<br>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
            <br>Humidity: ${data.main.humidity}%<br>Wind: ${data.wind.speed} m/s
        `;
    } catch (error) {
        weatherResult.textContent = error.message;
    }
});
