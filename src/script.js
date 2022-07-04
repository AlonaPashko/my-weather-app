
  function formatDate(timestamp){
    let date = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[date.getDay()];
    let hours = date.getHours();
    
    if (hours < 10){
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if(minutes < 10){
      minutes = `0${minutes}`;
    }
    return `${day}, ${hours} : ${minutes}`;
  }
  function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  function displayForecast(response){
  
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function(forecastDay, index){
    if (index > 0 && index < 7){
      forecastHTML += `
      <div class="col-2"><div class="weather-forecast-date">
          ${formatDay(forecastDay.dt)}
      </div>
      <div class="weather-forecast-icons">
      <img class="weather-icon" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="42px"/>
      </div>
      <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-max">${Math.round(forecastDay.temp.max)}° </span>
          <span class="weather-forecast-temp-min"> ${Math.round(forecastDay.temp.min)}°</span> 
      </div>
      </div>`;
    }
  })

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates){
let apiKey = "0872dacd74a30528eb08cd3ce78d89ee";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

  function searchCity(city)
{
  let apiKey = "0872dacd74a30528eb08cd3ce78d89ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function searchLocation(position)
{
  let apiKey = "0872dacd74a30528eb08cd3ce78d89ee";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event)
{
  event.preventDefault();
  let city = document.querySelector("#input-form").value;
  searchCity(city);
}

function showWeatherCondition(response){
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#current-time").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = Math.round(response.data.main.temp);

  getForecast(response.data.coord);
}

function getCurrentLocation(event){
event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);
}
  let userSearch = document.querySelector("#search-form");
  userSearch.addEventListener("submit", handleSubmit);

  let currentButton = document.querySelector("#current-location-button");
  currentButton.addEventListener("click", getCurrentLocation);
  
  searchCity("Wejherowo");

 
  