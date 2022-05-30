
// Global Variables

var cityName = ""
var btnEl = document.querySelector(".btn");
var secret = "10bdd765350b62b1d956051bc4e6292c";
var cityArr = [];
var lat = "";
var lon = "";
var units = "imperial";
var lang = "en";
var places = {};
var histBtnTarget = document.getElementsByClassName("btn city-btn");
var locationButtonsEl = document.querySelector("#location-buttons");
var placeHolderErrorTxt = "Make sure you enter a city name and that it's a real city."
var placeHolderResetTxt = "Enter City Name Here"

// intialize the web application
function init() {

  places = JSON.parse(localStorage.getItem("places"));

  if (!places) {
    places = {
      city: [],
    };
    return;
  }

  // full disclosure - go this snippet from stackoverflow and I am forever grateful for it too!!!
  var tempObj = {};
  var tempArr = [];

  for (i = 0; i < places.city.length; i++) {
    tempObj[places.city[i]] = 0;
  }
  for (i in tempObj) {
    tempArr.push(i);
  }

  for (i = 0; i < tempArr.length; i++) {
    var restoreName = places.city[i]
    histBtnTarget[i].innerHTML = restoreName;
    histBtnTarget[i].className = "btn btn-secondary city-btn m-1"
    histBtnTarget[i].dataset.location = restoreName;

  };
};

// move the city name to localstorage for use in history button list
function storeHistory(name) {

  console.log("This is the location: ", name)
  console.log("Console loggin ", places);

  var btnArr = [];

  for (i = 0; i < histBtnTarget.length; i++) {
    if (!histBtnTarget[i].dataset.location) {
      btnArr.push(histBtnTarget[i]);
    }
  }

  if (cityArr.indexOf(name) === -1) {
    places.city.push(name);
    localStorage.setItem("places", JSON.stringify(places));
  }

  for (i = 0; i < btnArr.length; i++) {
    btnArr[0].innerHTML = name;
    histBtnTarget[i].className = "btn btn-secondary city-btn m-1"
    btnArr[0].dataset.location = name;
  }
};


// manipulate some information when a history button is clicked
function btnClickHandler(event) {
  cityName = event.target.getAttribute("data-location");
  if (cityName) {
    getWeather(location);
  }
};

// maniputlet some information when the form data is submitted
function frmBtnClickHander(event) {
  event.preventDefault();
  cityName = document.querySelector("input");
  cityName = cityName.value.trim()
  cityName = cityName.toLowerCase();
  if (cityName) {
    storeHistory(cityName);
    getWeather(cityName);
  };
};

// function to capture weather data and build the html with the output
function getWeather(event) {
  var apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${secret}&units=${units}`;
  var wData = "";
  fetch(apiUrl1).then(function (response) {
    if (!response.ok) {
      document.querySelector("input").value = "";
      document.querySelector("input").placeholder = placeHolderErrorTxt;
      return;
    }

    if (response.ok) {
      var now = dayjs().format("MM/DD/YYYY");
      console.log("dayJs says now is " + now);
      document.querySelector("#city-name").textContent = cityName;
      document.querySelector("#city-date").textContent = now;

      response.json().then(function (data) {
        console.log(cityName);
        wData = data;

        var iconCode = wData.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        var iconEl = document.createElement("img");
        document.querySelector("#icon-url").src = iconUrl;

        //get temp, humdity, wind
        var currTemp = wData.main.temp;
        var currWind = wData.wind.speed;
        var currHum = wData.main.humidity;

        // var tempEl = document.createElement("p");
        var tempElTarget = document.querySelector("#current-temp");
        // tempElTarget.appendChild(tempEl);
        tempElTarget.textContent = "Temp: " + currTemp + "°F"; //degree symbol = alt + 0176 for PC. Option-Shift-8 for mac
        // console.log(tempElTarget);

        // var windEl = document.createElement("p");
        var windElTarget = document.querySelector("#current-wind");
        // windElTarget.appendChild(windEl);
        windElTarget.textContent = "Wind: " + currWind + " MPH";

        // var humEl = document.createElement("p");
        var humElTarget = document.querySelector("#current-humidity");
        // humElTarget.appendChild(windEl);
        humElTarget.textContent = "Humdity: " + currHum + "%";

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

            document.querySelector("input").value = "";
            document.querySelector("input").placeholder = placeHolderResetTxt;

            response.json().then(function (data) {
              wData2 = data;
              var currUvi = wData2.current.uvi
              var uviEl = document.createElement("p");
              var uviTarget = document.querySelector("#current-uvi");
              uviTarget.appendChild(uviEl);
              uviTarget.innerHTML = "UV Index: " + "<span class='rating badge badge-primary badge-pill'>" + currUvi + "</span>";
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
                document.querySelector("#date" + [i]).textContent = dailyDate;

                dailyIcon = wData2.daily[i].weather[0].icon
                var iconUrl = `http://openweathermap.org/img/w/${dailyIcon}.png`;
                document.querySelector("#img-d" + [i]).src = iconUrl;

                temp = wData2.daily[i].temp.day;
                document.querySelector("#tmp-d" + [i]).textContent = "Temp: " + temp + "°F";

                wind = wData2.daily[i].wind_speed;
                document.querySelector("#wind-d" + [i]).textContent = "Wind: " + wind + " MPH";
                ;
                hum = wData2.daily[i].humidity
                document.querySelector("#hum-d" + [i]).textContent = "Humidity: " + hum + " %";
              }
            })
          }
        })

      });
    }
  });
};


init();
btnEl.addEventListener("click", frmBtnClickHander)
locationButtonsEl.addEventListener("click", btnClickHandler);