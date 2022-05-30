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

function init() {


  places = JSON.parse(localStorage.getItem("places"));


  if (!places) {
    places = {
      city: [],
    };
    return;
  }

  var tempObj = {};
  var tempArr = [];
  // places.city.reverse();

  for (i = 0; i < places.city.length; i++) {
    tempObj[places.city[i]] = 0;
  }
  for (i in tempObj) {
    tempArr.push(i);
  }

  for (i = 0; i < tempArr.length; i++) {
    var restoreName = places.city[i]
    histBtnTarget[i].innerHTML = restoreName;
    histBtnTarget[i].dataset.location = restoreName;

  };

  // I want to get the most recent entries from object
  // I want to not show duplicates
  //got this from stack overflow, how to remove duplicates from an array

  //HELPER FUNCTION -- createHistory()
  // var tempOut = [];
  // var tempObj = {};
  // places.city.reverse();

  // for (i = 0; i < places.city.length; i++) {
  //   tempObj[places.city[i]] = 0;
  // }
  // for (i in tempObj) {
  //   tempOut.push(i);
  // }
  // console.log("tempOut = ", tempOut);


  // // create buttons




  // var targEl = document.querySelector("#history-section");
  // // var buttonEl = document.createElement("button");


  // if (tempOut.length > 7) {
  //   var len = 7;
  //   for (i = 0; i < len; i++) {
  //     cityArr.push(tempOut[i]);
  //   }
  // } else {
  //   cityArr = tempOut
  // };

  // console.log("cityArr = ", cityArr);

  // idx = cityArr.length;

  // cityArr.forEach(function (cityArr) {
  //   console.log()
  //   var buttonEl = document.createElement("button");
  //   buttonEl.setAttribute("class", "btn btn-secondary");
  //   buttonEl.textContent = cityArr;
  //   targEl.appendChild(buttonEl);
  // })
  // END createHistory



};






// for (i = 0; i < len; i++) {
//   var targEl = document.querySelector("#history-section");
//   buttonEl.setAttribute("id", "button-" + [i]);
//   targEl.appendChild(buttonEl;
//   buttonEl.innerHTML = tempOut[i];

// }




//   for(i=0; i<places.length || i < 7; i++) {

//   }
//   historyBtn = document.createElement("button");
// document.appendChild(historyBtn)





function storeHistory(name) {


  // as soon as I hit enter on city save that to localStoragee
  console.log("This is the location: ", name)
  console.log("Console loggin ", places);
  // document

  //and create a history button
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
    btnArr[0].dataset.location = name;
  }






};



//   if (histBtnTarget[i].dataset.location = "") {
//     console.log(histBtnTarget)
//     btnArr.push(histBtnTarget[i]);

//     console.log(btnArr);

//   }

//   // console.log("temp city = ", tempCity)
//   // if (!tempCity) {
//   //   console.log("this element is blank so create a button");
//   //   histBtnTarget[i].innerHTML = name;
//   //   histBtnTarget[i].dataset.location = name;
//   //   places.city[i] = name
//   //   localStorage.setItem("places", JSON.stringify(places));
//   //   return;
//   // }
//   // if (tempCity === name) {
//   //   console.log("this city already has a button so we're done here")
//   //   // cityArr[i] = name;
//   //   // histBtnTarget[i].innerHTML = cityArr[i];
//   //   // histBtnTarget[i].dataset.location = cityArr[i];
//   //   // localStorage.setItem("places", JSON.stringify(places));
//   //   return;
//   // }

//   // console.log("Ok we need to create an addtional button")
//   // // get the next button in the array
//   // histBtnTarget[i].innerHTML = name;
//   // histBtnTarget[i].dataset.location = name;











//get all items in array and if any of them match 'name' then put set that one to [0] and break;
// if it's not equal to that one then add the new name to the [0] location and remove the [7] location.
// create event listeners like I did in the code quiz challenge.  attach those to the function getWeather Function and create the getWeather function.


//   histBtnTarget[i].innerHTML = name;
//   debugger;
//   break;
// } else {


// }



//  var language = event.target.getAttribute("data-location");

// newbtnEl.setAttribute("class", "btn btn-secondary");
// newbtnEl.textContent = name;
// document.getElementById("history-section").childNodes.addAt(0, newbtnEl);


init();

// function getWeather(location) {
//   console.log(location);

// };





function btnClickHandler(event) {
  cityName = event.target.getAttribute("data-location");
  if (cityName) {
    getWeather(location);

    //     // clear old content
    //     // repoContainerEl.textContent = "";
  }
};

locationButtonsEl.addEventListener("click", btnClickHandler);



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

function frmBtnClickHander(event) {
  event.preventDefault();
  cityName = document.querySelector("input");
  cityName = cityName.value.trim()
  cityName = cityName.toLowerCase();
  if (cityName) {
    storeHistory(cityName);
    getWeather(cityName);
  };
}


btnEl.addEventListener("click", frmBtnClickHander)