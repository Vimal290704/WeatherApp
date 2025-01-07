// Weather app functionality
document.getElementById('get-weather-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    console.log('City input:', city);
    getWeather(city);
});

function getWeather(city) {
    const weatherApiKey = 'ee9105621f0c40fe9ab110758250701'; // Replace with your WeatherAPI key
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}&aqi=no`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('weather-details').innerHTML = 'City not found!';
                document.getElementById('weather-image').src = '';
            } else {
                // Display weather details
                const weatherDetails = `
                    <p>City: ${data.location.name}</p>
                    <p>Temperature: ${data.current.temp_c} °C</p>
                    <p>Weather: ${data.current.condition.text}</p>
                    <p>Humidity: ${data.current.humidity}%</p>
                `;
                document.getElementById('weather-details').innerHTML = weatherDetails;

                // Fetch image for the city (not weather condition)
                fetchCityImage(city);
            }
        })
        .catch(error => {
            document.getElementById('weather-details').innerHTML = 'Error fetching weather data.';
            document.getElementById('weather-image').src = '';
        });
}

function fetchCityImage(city) {
    const unsplashApiKey = 'HthniUudTueeStDHxfVnctaabkvWTAO8rammcaytDrg'; // Replace with your Unsplash API key
    const query = city.toLowerCase().replace(/\s+/g, '-'); // Format city name for Unsplash search
    console.log('Formatted query for Unsplash:', query);

    const unsplashUrl = `https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashApiKey}`;

    fetch(unsplashUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Unsplash API response:', data);

            if (true) {
                const imageUrl = data.urls.full;
                console.log('Image URL found:', imageUrl);
                document.getElementById('weather-image').src = imageUrl;
            } else {
                // Default image if no relevant image is found
                console.log('No relevant image found. Showing fallback image.');
                document.getElementById('weather-image').src = 'https://source.unsplash.com/random/600x400?city';
            }
        })
        .catch(error => {
            console.error('Error fetching image from Unsplash:', error);
            // Show fallback image in case of an error
            document.getElementById('weather-image').src = 'https://source.unsplash.com/random/600x400?city';
        });
}
