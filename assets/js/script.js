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
var units = "imperial";
var lang = "en";
var places = {};

function init() {


  places = JSON.parse(localStorage.getItem("places"));
  console.log(places);  


  if (!places) {
    places = {
      city: [],
    };
    return;
  }

  // I want to get the most recent entries from object
  // I want to not show duplicates
  //got this from stack overflow, how to remove duplicates from an array
  var tempOut = [];
  var tempObj = {};
  places.city.reverse();

  for (i = 0; i < places.city.length; i++) {
    tempObj[places.city[i]] = 0;
  }
  for (i in tempObj) {
    tempOut.push(i);
  }
  console.log(tempOut);


  // create buttons


  //   for(i=0; i<places.length || i < 7; i++) {

  //   }
  //   historyBtn = document.createElement("button");
  // document.appendChild(historyBtn)



};

function storeHistory(name) {
  // as soon as I hit enter on city save that to localStoragee
  console.log("This is the location: ", name)
  places.city.push(name)
  console.log(places);
  localStorage.setItem("places", JSON.stringify(places));

}


init();



btnEl.addEventListener("click", function (event) {
  event.preventDefault();
  inputEl = inputEl.value;
  console.log(inputEl);
  inputEl.trim();
  inputEl = inputEl.toLowerCase();

  var cityName = inputEl;

  console.log(cityName);
  document.getElementById("city-input").value = "";

  var now = dayjs().format("MM/DD/YYYY");
  console.log("dayJs says now is " + now);
  document.querySelector("#city-name").textContent = cityName;
  document.querySelector("#city-date").textContent = now;
  var apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${secret}&units=${units}`;
  var wData = "";

  fetch(apiUrl1).then(function (response) {
    console.log(response);
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        storeHistory(cityName);
        wData = data;

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
        tempElTarget.innerHTML = "Temp: " + currTemp + "°F"; //degree symbol = alt + 0176 for PC. Option-Shift-8 for mac
        console.log(tempElTarget);

        var windEl = document.createElement("p");
        var windElTarget = document.querySelector("#current-wind");
        windElTarget.appendChild(windEl);
        windElTarget.innerHTML = "Wind: " + currWind + " MPH";

        var humEl = document.createElement("p");
        var humElTarget = document.querySelector("#current-humidity");
        humElTarget.appendChild(windEl);
        humElTarget.innerHTML = "Humdity: " + currHum + "%";

        //need to caputure lat and lon of city, lets do that here
        lon = wData.coord.lon;
        lat = wData.coord.lat;

        var apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${secret}&units=${units}&lang=${lang}`
        fetch(apiUrl2).then(function (response) {
          console.log("apiUrl2 " + response);
          if (!response.ok) {
            console.error(response);
            return;
          }
          if (response.ok) {
            response.json().then(function (data) {
              wData2 = data;
              var currUvi = wData2.current.uvi
              var uviEl = document.createElement("p");
              var uviTarget = document.querySelector("#current-uvi");
              uviTarget.appendChild(uviEl);
              uviTarget.innerHTML = "UV Index: " + "<span class='rating'>" + currUvi + "</span>";
              rating = Math.floor(currUvi)


              if (rating >= 0 && rating <= 2) {
                console.log("green")
                document.querySelector("span").setAttribute("style", "background-color: green");
              };

              if (rating > 2 && rating <= 5) {
                console.log("yellow")
                document.querySelector("span").setAttribute("style", "background-color: yellow");
              };

              if (rating > 5 && rating <= 7) {
                console.log("orange");
                document.querySelector("span").setAttribute("style", "background-color: orange");
              };

              if (rating > 7 && rating <= 10) {
                console.log("red");
                document.querySelector("span").setAttribute("style", "background-color: red");
              };

              if (rating > 11) {
                console.log("purple");
                document.querySelector("span").setAttribute("style", "background-color: purple");
              };



              //create 5 day forcast html

              for (i = 1; i < 6; i++) {
                dailyDate = wData2.daily[i].dt
                dailyDate = dayjs.unix(dailyDate).format("MM/DD/YYYY");
                document.querySelector("#d" + [i]).appendChild(document.createElement("p")).textContent = dailyDate;

                dailyIcon = wData2.daily[i].weather[0].icon
                var iconUrl = `http://openweathermap.org/img/w/${dailyIcon}.png`;
                document.querySelector("#d" + [i]).appendChild(document.createElement("img")).setAttribute("src", iconUrl);

                temp = wData2.daily[i].temp.day;
                document.querySelector("#d" + [i]).appendChild(document.createElement("p")).textContent = "Temp: " + temp + "°F";

                wind = wData2.daily[i].wind_speed;
                document.querySelector("#d" + [i]).appendChild(document.createElement("p")).textContent = "Wind: " + wind + " MPH";
                ;
                hum = wData2.daily[i].humidity
                document.querySelector("#d" + [i]).appendChild(document.createElement("p")).textContent = "Humidity: " + hum + " %";
              }
            })
          }
        })

      });
    }
  });
}); //end of working code

//START - history buttons


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










