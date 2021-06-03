function displayTime() {
  if (minutes < 10) {
    currentDayTime.innerHTML = `${day} ${hours}:0${minutes}`;
  } else {
    currentDayTime.innerHTML = `${day} ${hours}:${minutes}`;
  }
}
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let currentDayTime = document.querySelector("#current-date-time");
currentDayTime.innerHTML = `${day} ${hours}:${minutes}`;

let currentTemp = document.querySelector("#current-temp");
let humid = document.querySelector("#humidity");
let condition = document.querySelector("#description");
let feels = document.querySelector("#feels-like");
let cityname = document.querySelector("#city-name");
let celsius = document.querySelector("#celsius");
let farenheit = document.querySelector("#farenheit");
let apiEndpoint = `https://api.openweathermap.org/data/2.5/`;
let apiKey = "88ea709c6b2fe7e59729b838f594b573";

celsius.addEventListener("click", changeToCelsius);
farenheit.addEventListener("click", changeToFarenheit);

function searchForCity(event) {
  event.preventDefault();
  let findCity = document.querySelector("#find-city");
  let city = findCity.value;
  let units = "Metric";
  let apiUrl = `${apiEndpoint}find?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.list[0].main.temp);
  findCity = document.querySelector("#find-city");
  city = findCity.value;
  city = city.toUpperCase();
  let countryCode = response.data.list[0].sys.country;
  console.log(response.data);
  let humidityLevel = response.data.list[0].main.humidity;
  let tempFeels = Math.round(response.data.list[0].main.feels_like);
  let weatherDescrip = response.data.list[0].weather[0].main;

  cityname.innerHTML = `${city}, ${countryCode}`;
  currentTemp.innerHTML = `${temperature}ºC`;
  feels.innerHTML = `feels like ${tempFeels}ºC`;
  humid.innerHTML = `Humidity ${humidityLevel}%`;
  condition.innerHTML = `${weatherDescrip}`;
}

let form = document.querySelector("form");
form.addEventListener("submit", searchForCity);

let button = document.querySelector("#current-location");
button.addEventListener("click", findCoords);

function findCoords() {
  navigator.geolocation.getCurrentPosition(findLocation);
}

function findLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  units = "Metric";
  let apiAddress = `${apiEndpoint}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiAddress).then(updateLocationDetails);
}

function updateLocationDetails(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let feelsLike = Math.round(response.data.main.feels_like);
  let locationName = response.data.name;
  let country = response.data.sys.country;
  let humidity = response.data.main.humidity;
  let description = response.data.weather[0].main;
  currentTemp.innerHTML = `${temperature}ºC`;
  feels.innerHTML = `feels like ${feelsLike}ºC`;
  humid.innerHTML = `Humidity ${humidity}%`;
  condition.innerHTML = `${description}`;
  cityname.innerHTML = `${locationName}, ${country}`;
}

function changeToCelsius(event) {
  event.preventDefault();
  currentTemp.innerHTML = "11ºC";
}

function changeToFarenheit(event) {
  event.preventDefault();
  currentTemp.innerHTML = "52ºF";
}
