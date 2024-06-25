const search = document.querySelector('.search-box button');
const container = document.querySelector('.container');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
    const APIKey = '98740f4ebc0d63bc0f8ba70090e5a091';
    const city = document.querySelector('.search-box input').value;

    if (city == '') return;

    console.log('Fetching weather data for:', city);  // Debugging line

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            console.log('Received response:', response);  // Debugging line
            return response.json();
        })
        .then(json => {
            console.log('Parsed JSON:', json);  // Debugging line
            
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images_used/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images_used/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images_used/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images_used/cloud.png';
                    break;
                case 'Mist':
                    image.src = 'images_used/mist.png';
                    break;
                case 'Haze':
                    image.src = 'images_used/mist.png';
                    break;
                default:
                    image.src = 'images_used/cloud.png';
                    break;
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);  // Debugging line
        });
});
