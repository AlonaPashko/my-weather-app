
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

 
  