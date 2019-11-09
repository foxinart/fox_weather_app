
function formatHours (timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minuties = date.getMinutes();
  if (minuties < 10) {
    minuties = `0${minuties}`;
  }
  return `${hours}:${minuties}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += ` 
  <div class="col-sm next-day">
  <div>
      <img id="icon-forecast" 
      src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
      alt=""/>
  </div>
      <h2>
          ${formatHours(forecast.dt * 1000)}
      </h2>
      <div class="weather-temperature-forecast">
      ${Math.round(forecast.main.temp_max)}º | ${Math.round(forecast.main.temp_min)}º
      </div>
  </div>
  `;   
  }
}    

function displayTemperature(response) {
  
  let statusElement = document.querySelector("#status");
  statusElement.innerHTML = response.data.weather[0].description;

  temperatureCelsius = response.data.main.temp;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(temperatureCelsius);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = Math.round(response.data.main.pressure);

  let iconElement = document.querySelector("#icon-today");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  iconElement.setAttribute("alt", response.data.weather[0].description);

  let currentLocation = document.querySelector("h1");
  currentLocation.innerHTML = response.data.name;
}  

function search(city) {
  let apiKey = "c5c1992383057589b3e373582566187c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
  }

function getTemperature(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  
  let apiKey = "c5c1992383057589b3e373582566187c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(temperatureFahrenheit);
}

function convertToCelsius(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(temperatureCelsius);

}

let temperatureCelsius = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);


  let dateDay = document.querySelector("#current-day");
  let dateTime = document.querySelector("#current-time");
  
  let currentTime = new Date();
  let date = currentTime.getDate();
  
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[currentTime.getMonth()];
  
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];


  let day = days[currentTime.getDay()];
  dateDay.innerHTML = `${month} ${date} | ${day}`;
  
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minuties = currentTime.getMinutes();
  if (minuties < 10) {
    minuties = `0${minuties}`;
  }
  dateTime.innerHTML = `${hours}:${minuties}`;

let currentTemperature = document.querySelector("#temperature");
currentTemperature.innerHTML = navigator.geolocation.getCurrentPosition(getTemperature);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitCity);
  
search ("city");