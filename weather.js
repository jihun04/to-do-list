const weather = document.querySelector(".js-weather"),
    weatherIcon = document.querySelector(".weather-icon"),
    temperatureIcon = document.querySelector(".js-weather-icon"),
    weatherDescriptionText = document.querySelector(".weather-description__text");

const API_KEY = "85a868745925286701deacff570bc78b"
const COORDS = "coords",
    FAS = "fas",
    FAR = "far",
    SMILEICON = "fa-smile",
    TEMPERATUREHIGHICON = "fa-temperature-high",
    TEMPERATURELOWICON = "fa-temperature-low";

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function (responce) {
        return responce.json();
    }).then(function (json) {
        const temperature = json.main.temp;
        const place = json.name;
        const jsonWeather = json.weather;
        jsonWeather.forEach(function (jsonWeather) {
            const iconName = jsonWeather.icon;
            const iconSrc = `https://openweathermap.org/img/wn/${iconName}.png`;
            const description = jsonWeather.description;
            weatherIcon.style.backgroundImage = `url('${iconSrc}')`;
            weatherDescriptionText.innerText = description;
        })
        weather.innerText = `${temperature}° | ${place}`;
        if(temperature >= 29) {
            temperatureIcon.className = "js-weather-icon";
            temperatureIcon.classList.add(FAS);
            temperatureIcon.classList.add(TEMPERATUREHIGHICON);
        } else if(temperature <= 28 && temperature >= 18) {
            temperatureIcon.className = "js-weather-icon";
            temperatureIcon.classList.add(FAR);
            temperatureIcon.classList.add(SMILEICON);
        } else {
            temperatureIcon.className = "js-weather-icon"
            temperatureIcon.classList.add(FAS);
            temperatureIcon.classList.add(TEMPERATURELOWICON);
        }
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }

}

function init() {
    loadCoords();
    setInterval(loadCoords, 600000)
}

init();