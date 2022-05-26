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




// START commited on 5/24 11:26 pm //working
var apiUrl1 =
    "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=10bdd765350b62b1d956051bc4e6292c";
var apiUrl2 = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
var inputEl = document.querySelector("input");
var btnEl = document.querySelector(".btn");
var secret = "10bdd765350b62b1d956051bc4e6292c"
var cityArr = []

btnEl.addEventListener("click", function (event) {
    event.preventDefault();
    inputEl = inputEl.value;
    console.log(inputEl);
    inputEl.trim();
    inputEl = inputEl.toLowerCase();
    inputElArr = inputEl.split(" ");

    if (inputElArr.length > 1) {
        for (i = 0; i < inputElArr.length; i++) {
            cityArr.push(inputElArr[i], "&")
        }
        var cityName = cityArr.join("");
    } else {
        var cityName = inputEl + "&";
    }
    console.log(cityName);
    document.getElementById("city-input").value=""

    // if(inputEl.length > 1) {
    //     for (i = 0; i < inputEl.length; i++) {
    //         cityName = inputEl.concat([inputEl[i] + "&"]);
    //     }









    // End commited on 5/24 11:26 pm //working


    // return current conditions for city
    // 1. build a query string from the city name in City.
    // apiUrl2 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "appid=" + secret + "";
    // console.log(apiUrl2);




});



// NOT STARTED
//get current weather
//get 7-day forcast - 2-days

//return current conditions for city

//return future conditions for city

//capture in local storage for history

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
