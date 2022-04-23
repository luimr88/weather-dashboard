var userFormEl = document.getElementById("user-form");
var searchInput = document.getElementById("search-input");
// var currentWeatherEl = $("current-weather");
//var currentWeatherCity = document.getElementById("city-name");

const APIKey = "2b1e92a1c0dec53ca23b0b3b62b71733";

var getCityInput = function (event) {
    event.preventDefault();
    var cityName = searchInput.value.trim();
    if(cityName) {
        console.log(cityName);
        getCityWeather(cityName);
        searchInput.value = "";
    } else {
        alert("Please enter a city Name")
    }
};

var getCityWeather = function (cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // var temp = data.main.temp;
                // console.log(temp);
                //clearForecast();
                displayWeather(data);
            });
        } else {
            alert("City Not Found");
        }
    })
};

var displayWeather = function (data) {
    $("#current-weather").text("");
    var currentDate = moment(data.dt * 1000).format("MM.DD.YYYY");
    var icon = data.weather[0].icon;
    console.log(icon);
    //currentWeatherCity.textContent = data.name + " Current Weather " + currentDate;
    var currentWeatherCity = $("<h2>").text(data.name + " Current Weather " + currentDate);
    var ulEl = $("<ul>").attr('class', "list-unstyled")
    var tempEl = $("<li>").text("Temperature: " + data.main.temp + " \u00B0F");
    var windEl = $("<li>").text("Wind: " + data.wind.speed + " MPH");
    var humidityEl = $("<li>").text("Humidity: " + data.main.humidity + " %");
    var weatherIcon = $("<img>").attr('src', "http://openweathermap.org/img/wn/" + icon + "@2x.png").attr('class', "img-fluid");
    
    $("#current-weather").append(currentWeatherCity);
    currentWeatherCity.append(weatherIcon);
    $("#current-weather").append(ulEl);
    ulEl.append(tempEl);
    ulEl.append(windEl);
    ulEl.append(humidityEl);
};

var clearForecast = function () {
    $("#current-weather").remove();
}

userFormEl.addEventListener("submit", getCityInput);