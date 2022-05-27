// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// var apiUrlFcast = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=10bdd765350b62b1d956051bc4e6292c";
// var apiUrlCurr = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
// var apiUrlUvi = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"

var inputEl = document.querySelector("input");
var btnEl = document.querySelector(".btn");
var secret = "10bdd765350b62b1d956051bc4e6292c";
var cityArr = [];
var lat = "";
var lon = "";

btnEl.addEventListener("click", function (event) {
  event.preventDefault();
  inputEl = inputEl.value;
  console.log(inputEl);
  inputEl.trim();
  inputEl = inputEl.toLowerCase();
  // inputElArr = inputEl.split(" ");

  // if (inputElArr.length > 1) {
  //     for (i = 0; i < inputElArr.length; i++) {
  //         cityArr.push(inputElArr[i], "&")
  //     }
  //     var cityName = cityArr.join("");
  // } else {
  var cityName = inputEl;
  // }
  console.log(cityName);
  document.getElementById("city-input").value = "";

  //build the query
  // apiUrl2 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + secret + "";
}); //end of button click event function

// 1. fetch data
var testCityName = "Chapel Hill";
var now = dayjs().format("MM/DD/YYYY");
console.log("dayJs says now is " + now);
document.querySelector("#city-name").textContent = testCityName;
document.querySelector("#city-date").textContent = now;
var testApi1 =
  "https://api.openweathermap.org/data/2.5/weather?q=chapel%20hill&appid=10bdd765350b62b1d956051bc4e6292c&units=imperial";
var wData = "";

fetch(testApi1).then(function (response) {
  if (response.ok) {
    console.log(response);
    response.json().then(function (data) {
      wData = data;

      //need to caputure lat and lon of city, lets do that here
      lon = wData.coord.lon;
      lat = wData.coord.lat;

      //   construct the icon and get that out of the way
      var iconCode = wData.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
      var iconEl = document.createElement("img");
      iconEl.setAttribute("src", iconUrl);
      var wIiconEl = document.querySelector(".icon");
      wIiconEl.appendChild(iconEl);
      iconEl.setAttribute("src", iconUrl);

      //get temp, humdity, wind
      var currTemp = wData.main.temp;
      var currWind = wData.wind.speed;
      var currHum = wData.main.humidity;

      var tempEl = document.createElement("p");
      var tempElTarget = document.querySelector("#current-temp");
      tempElTarget.appendChild(tempEl);
      tempElTarget.innerHTML = "Temp: " + currTemp + "°F"; //degree symbol = alt + 0176
      console.log(tempElTarget);

      var windEl = document.createElement("p");
      var windElTarget = document.querySelector("#current-wind");
      windElTarget.appendChild(windEl);
      windElTarget.innerHTML = "Wind: " + currWind + " MPH";

      var humEl = document.createElement("p");
      var humElTarget = document.querySelector("#current-humidity");
      humElTarget.appendChild(windEl);
      humElTarget.innerHTML = "Humdity: " + currHum + "%";

      //construct current conditions
    });
  }
}); //end of fetch function for current weather everything except UVI



// start of UVI fetch
fetch(testApi2).then(function (response) {
  if (response.ok) {
    console.log(response);
    response.json().then(function (data) {
      wData = data;
    });
  }
}); //end of fetch code for UVI

// console.log(apiUrl2)

// window.open(apiUrl2);

// START cuttent conditions card
// return cityName
// date -- jscript Date()

// from apiUrl2
// weather icon -- .weather.icon()
// temp -- .main.temp()
// wind -- .wind.speed()
// humidity -- .main.humidity()
// UV index
// chapel hill test -- current.uvi()
// https://api.openweathermap.org/data/2.5/onecall?lat=35.9132&lon=-79.0558&exclude=hourly,daily&appid=10bdd765350b62b1d956051bc4e6292c
//

// NOT STARTED
// get current weather
// get 7-day forcast - 2-days

// return current conditions for city

// return future conditions for city

// capture in local storage for history

// display in html

// function getWeatherForcast ()

// var getUserRepos = function(user) {
//     // format the github api url
//     // var apiUrl = 'https://api.github.com/users/' + user + '/repos';

//     // make a get request to url
//     fetch(apiUrl)
//       .then(function(response) {
//         // request was successful
//         if (response.ok) {
//           console.log(response);
//           response.json().then(function(data) {
//             console.log(data);
//             displayRepos(data, user);
//           });
//         } else {
//           alert('Error: GitHub User Not Found');
//         }
//       })
//       .catch(function(error) {
//         alert('Unable to connect to GitHub');
//       });
