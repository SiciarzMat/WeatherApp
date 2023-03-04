const weatherIcon = document.querySelector(".weather-icon");
const locationIcon = document.querySelector(".location-icon");
const temperature = document.querySelector(".temperature-value p");
const description = document.querySelector(".temperature-description p");
const locationParagraph = document.querySelector(".location p");
const notification = document.querySelector(".notification");

const input = document.getElementById("search");
let city = "";
let latitude = 0.0;
let longitude = 0.0;

input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    city = input.value;
    searchWeather(city);
  }
});

const weather = {};

weather.temperature = {
  unit: "celsius",
};

const KELVIN = 273;

const key = "c6614b703a6817a1b417adec2e0db7ee";

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notification.style.display = "block";
  notification.innerHTML = "<p>Browser does not support geolocation</p>";
}

function setPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

locationIcon.addEventListener("click", function (e) {
  getWeather(latitude, longitude);
});

function showError(error) {
  notification.style.display = "block";
  notification.innerHTML = `<p> ${error.message} </p>`;
}

function searchWeather(city) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then((response) => response.json())
    .then((data) => {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.main = data.weather[0].main;
    })
    .then(displayWeather);
}

function getWeather(latitude, longitude) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
  )
    .then((response) => response.json())
    .then((data) => {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(displayWeather);
}

function displayWeather() {
  weatherIcon.innerHTML = `<img src='http://openweathermap.org/img/wn/${weather.iconId.replace(
    /\D/g,
    ""
  )}d@2x.png' height="150px"
  width="150px"/>`;
  document.body.style.backgroundImage = `url('/images/${weather.main}.jpg')`;
  temperature.innerHTML = `${weather.temperature.value} °<span>C</span>`;
  description.innerHTML = `${weather.description.toUpperCase()}`;
  locationParagraph.innerHTML = `${weather.city}, ${weather.country}`;
}
