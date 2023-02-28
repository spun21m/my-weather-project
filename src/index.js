function showCurrentTemp(response) {
  let inputCity = document.querySelector("#input-city");
  inputCity.innerHTML = response.data.name;

  let currentTemp = Math.round(response.data.main.temp);
  let temp = document.querySelector("#degreeTemperature");
  temp.innerHTML = currentTemp;

  let humidity = document.querySelector("#humidity-percentage");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;
}

function getCurrentDate() {
  let currentDate = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();
  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = `${day} ${hour}:${minute}`;
}

function highlightDegreeIcon() {
  let celciusIcon = document.querySelector(".degree-in-celcius");
  let fahrenheitIcon = document.querySelector(".degree-in-fahrenheit");
  if (celciusIcon.classList.contains("dark")) {
    celciusIcon.classList.remove("dark");
    fahrenheitIcon.classList.add("dark");
  }
}

function showTempInCelcius(event) {
  let fahreinheitTemp = document.querySelector("#degreeTemperature");
  let tempInCelcius = Math.round((fahreinheitTemp.innerHTML - 32) * 0.5556);
  let fahrenheitIcon = document.querySelector(".degree-in-fahrenheit");
  event.target.classList.add("dark");
  fahrenheitIcon.classList.remove("dark");
  fahreinheitTemp.innerHTML = `${tempInCelcius}`;
}

function showTempInFahrenheit(event) {
  let celciusTemp = document.querySelector("#degreeTemperature");
  let tempInFahrenheit = Math.round(celciusTemp.innerHTML * 1.8 + 32);
  let celciusIcon = document.querySelector(".degree-in-celcius");
  event.target.classList.add("dark");
  celciusIcon.classList.remove("dark");
  celciusTemp.innerHTML = `${tempInFahrenheit}`;
}

function getWeatherInfo(city) {
  let apiKey = "b0ab2a5a92585c3b0f486dbd9d819d01";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function search(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let searchInput = document.querySelector("#search-text-input");
  let inputValue = searchInput.value;
  if (inputValue) {
    inputCity.innerHTML = `${searchInput.value}`;
    getCurrentDate();
  }

  highlightDegreeIcon();

  getWeatherInfo(inputValue);
}

function showTopCityWeatherInfo(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  inputCity.innerHTML = event.target.innerHTML;
  getCurrentDate();

  highlightDegreeIcon();

  getWeatherInfo(inputCity.innerHTML);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b0ab2a5a92585c3b0f486dbd9d819d01";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemp);
  highlightDegreeIcon();
}

function displayCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let defaultCityWeather = document.querySelector("#input-city").innerHTML;
getWeatherInfo(defaultCityWeather);
getCurrentDate();

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", search);

let displayCity = document.querySelectorAll(".cities");
displayCity.forEach((item) => {
  item.addEventListener("click", showTopCityWeatherInfo);
});

let currentLocation = document.querySelector(".current-location");
currentLocation.addEventListener("click", displayCurrentLocationWeather);

let fahrenheitToCelcius = document.querySelector(".degree-in-celcius");
fahrenheitToCelcius.addEventListener("click", showTempInCelcius);

let celciusToFahrenheit = document.querySelector(".degree-in-fahrenheit");
celciusToFahrenheit.addEventListener("click", showTempInFahrenheit);
