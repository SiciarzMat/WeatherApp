const weatherIcon = document.querySelector(".weather-icon");
const locationIcon = document.querySelector(".location-icon");
const temperature = document.querySelector(".temperature-value p");
const description = document.querySelector(".temperature-description p");
const locationParagraph = document.querySelector(".location p");
const key = "c6614b703a6817a1b417adec2e0db7ee";

const input = document.getElementById("search");
let city = "";

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

function searchWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
  )
    .then((response) => response.json())
    .then((data) => {
      weather.temperature.value = Math.floor(data.main.temp - 273);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.main = data.weather[0].main;
    })
    .then(displayWeather);
}

function displayWeather() {
  weatherIcon.innerHTML = `<img src='https://openweathermap.org/img/wn/${weather.iconId.replace(
    /\D/g,
    ""
  )}d@2x.png' height="150px"
  width="150px"/>`;
  document.body.style.backgroundImage = `url('images/${weather.main}.jpg')`;
  temperature.innerHTML = `${weather.temperature.value} °<span>C</span>`;
  description.innerHTML = `${weather.description.toUpperCase()}`;
  locationParagraph.innerHTML = `${weather.city}, ${weather.country}`;
}
