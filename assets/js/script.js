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
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                console.log(lon);
                console.log(lat);
                var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;
                fetch(apiUrl).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (currentData) {
                            displayWeather(currentData, data);
                            futureForecast(currentData);
                        });
                    }
                })
            });
        } else {
            alert("City Not Found");
        }
    })
};

var displayWeather = function (currentData, data) {
    $("#current-weather").text("");
    var currentDate = moment(currentData.current.dt * 1000).format("MM.DD.YYYY");
    var icon = currentData.current.weather[0].icon;
    var uvIndex = currentData.current.uvi;
    console.log(uvIndex);
    console.log(icon);
    if(uvIndex < 2) {
        console.log("green");
        var uvEl = $("<span>").attr('class', "badge bg-success").text(uvIndex);
    } else if (uvIndex > 2 && uvIndex < 6) {
        console.log("yellow");
        var uvEl = $("<span>").attr('class', "badge bg-warning").text(uvIndex);
    } else if (uvIndex > 6 && uvIndex < 8) {
        console.log("orange");
        var uvEl = $("<span>").attr('class', "badge bg-secondary").text(uvIndex);
    } else if (uvIndex > 8 && uvIndex < 10) {
        console.log("red");
        var uvEl = $("<span>").attr('class', "badge bg-danger").text(uvIndex);
    } else {
        console.log("violet");
        var uvEl = $("<span>").attr('class', "badge bg-info").text(uvIndex);
    }
    var currentWeatherCity = $("<h2>").text(data.name + " Current Weather " + currentDate);
    var ulEl = $("<ul>").attr('class', "list-unstyled")
    var tempEl = $("<li>").text("Temperature: " + currentData.current.temp + " \u00B0F");
    var windEl = $("<li>").text("Wind: " + currentData.current.wind_speed + " MPH");
    var humidityEl = $("<li>").text("Humidity: " + currentData.current.humidity + " %");
    var indexEl = $("<li>").text("UV Index: ");
    var weatherIcon = $("<img>").attr('src', "http://openweathermap.org/img/wn/" + icon + "@2x.png").attr('class', "img-fluid");
    
    $("#current-weather").append(currentWeatherCity);
    currentWeatherCity.append(weatherIcon);
    $("#current-weather").append(ulEl);
    ulEl.append(tempEl);
    ulEl.append(windEl);
    ulEl.append(humidityEl);
    ulEl.append(indexEl);
    indexEl.append(uvEl);
};

var futureForecast = function (data) {
    $("#future-weather").text("");
    var forecastTitle = $("<h2>").text("5-Day Forecast:");
    var futureEl = $("<div>").attr('class', "row");
    $("#future-weather").append(forecastTitle);
    $("#future-weather").append(futureEl);
    for(var i = 0; i < 5; i++) {
        var currentDate = moment(data.daily[i + 1].dt * 1000).format("MM.DD.YYYY");
        var icon = data.daily[i + 1].weather[0].icon;
        var tempEl = $("<p>").text("Temperature: " + data.daily[i + 1].temp.day + " \u00B0F");
        var windEl = $("<p>").text("Wind: " + data.daily[i + 1].wind_speed + " MPH");
        var humidityEl = $("<p>").text("Humidity: " + data.daily[i + 1].humidity + " %");
        var futureDate = $("<h4>").text(currentDate);
        var forecastEl = $("<div>").attr('class', "rounded bg-light col text-center m-2");
        var iconSpan = $("<span>");
        var weatherIcon = $("<img>").attr('src', "http://openweathermap.org/img/wn/" + icon + "@2x.png")
        futureEl.append(forecastEl);
        forecastEl.append(futureDate);
        forecastEl.append(iconSpan);
        iconSpan.append(weatherIcon);
        forecastEl.append(tempEl);
        forecastEl.append(windEl);
        forecastEl.append(humidityEl);
    }

}

var clearForecast = function () {
    $("#current-weather").remove();
}

userFormEl.addEventListener("submit", getCityInput);