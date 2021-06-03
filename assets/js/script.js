//variables for program
const forecastProjection = 5;
const API_KEY = '7e237dd70a479b475daf29b07da4813a'
var WEATHER_SEARCH_API = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${cityName}&appid=${API_KEY}`
var cityName
var cityNameArr = {}
var buttonArr = []
var flag = 0;
var saveFlag = 0;
var errorFlag = 0;
var j = 0
//converts date to US standard with strings to match MVP
var currentDate = new Date().toLocaleDateString("en-US")
currentDate = " (" + currentDate + ") "
iconCodeArr = [
    {code:"01d",class:"clear-sky-day"},
    {code:"01n",class:"clear-sky-night"},
    {code:"02d",class:"partly-cloudy-day"},
    {code:"02n",class:"partly-cloudy-night"},
    {code:"03d",class:"scattered-clouds-day"},
    {code:"03n",class:"scattered-clouds-night"},
    {code:"04d",class:"broken-clouds-day"},
    {code:"04n",class:"broken-clouds-night"},
    {code:"09d",class:"rainy-day"},
    {code:"09n",class:"rainy-night"},
    {code:"10d",class:"rain-day"},
    {code:"10n",class:"rain-night"},
    {code:"11d",class:"thunderstorm-day"},
    {code:"11n",class:"thunderstorm-night"},
    {code:"13d",class:"snow-day"},
    {code:"13n",class:"snow-night"},
    {code:"50d",class:"mist-day"},
    {code:"50n",class:"mist-night"}
]
//START HEADER
//creates the HEADER and text within it
function header() {
    $("<header>").attr({ "id": "headerContainer" }).appendTo(document.body)
    return $("<h1>").text("Weather Dashboard").attr({ "class": "weatherHeader text-center" }).appendTo("#headerContainer")
}
//END HEADER

//START ASIDE
//creates the ASIDE, search bar and submit button
function citySearch() {
    $("<aside>").attr({ "id": "asideContainer", "class": "col-3" }).appendTo("#mainContainer")
    $("<h3>").text("Search for a City").attr({ "class": "asideHeader text-center" }).appendTo("#asideContainer")
    $("<input>").attr({ "id": "cityInput", "class": "col text-center" }).appendTo("#asideContainer")
    $("<button>").text("Search").attr({ "id": "citySubmit", "type": "button", "class": "col clicked" }).appendTo("#asideContainer")
}
//creates the section the search header sits in
function searchHistory() {
    $("<section>").attr({ "id": "searchContainer", "class": "col" }).appendTo("#asideContainer")
    $("<h3>").text("Search History").attr({ "id": "searchHeader", "class": "searchHeader text-center" }).appendTo("#searchContainer")
}
//creates the search history dynamically
function addSearch(i) {
    $("<button>").text(cityName).attr({ "id": "citySubmit" + (i), "type": "button", "class": "col clicked" }).appendTo("#searchContainer")
    onButtonClick()
}
//END ASIDE

//START CENTER SECTION
//Creates first instance of current weather, if flag 1 updates the data 
function dailyContents(cityName, date, icon, temp, wind, humidity, UV, iconCode) {
    if (flag == 1) {
        updateDaily(cityName, date, icon, temp, wind, humidity, UV)
    }
    else {
        $("<section>").attr({ "id": "dailyContainer", "class": "col-9" }).appendTo("#mainContainer")
        $("<h3>").text(cityName + date).attr({ "id": "cityDate", "class": "text-center" }).appendTo("#dailyContainer")
        $("<img>").attr({ "id": "icon", "src": icon }).appendTo("#cityDate")
        $("<h4>").text("Temp:" + "\xa0" + temp + "\u00B0F").attr({ "id": "Temperature" }).appendTo("#dailyContainer")
        $("<h4>").text("Wind:" + "\xa0" + wind + "\xa0" + "MPH").attr({ "id": "Wind" }).appendTo("#dailyContainer")
        $("<h4>").text("Humidity:" + "\xa0" + humidity + "\xa0" + "%").attr({ "id": "Humidity" }).appendTo("#dailyContainer")
        $("<h4>").text("UV Index:").attr({ "id": "UV" }).appendTo("#dailyContainer")
        $("<h5>").text("\xa0" + UV + "\xa0").attr({ "id": "UVBox", "class": "" }).appendTo("#UV")
        UVColor(UV)
    }
}
//Updates current weather values with searched or history city
function updateDaily(cityName, date, icon, temp, wind, humidity, UV) {
    $("#cityDate").text(cityName + date)
    $("<img>").attr({ "id": "icon", "src": icon }).appendTo("#cityDate")
    $("#Temperature").text("Temp:" + "\xa0" + temp + "\u00B0F")
    $("#Wind").text("Wind:" + "\xa0" + wind + "\xa0" + "MPH")
    $("#Humidity").text("Humidity:" + "\xa0" + humidity + "\xa0" + "%")
    $("#UVBox").text("\xa0" + UV + "\xa0")
    UVColor(UV)
}
function updateBodyBackground(iconCode,iconCodeArr){
    for(var i = 0;i<iconCodeArr.length;i++)
    {
        $("#background").removeClass(iconCodeArr[i].class)
        if(iconCodeArr[i].code==iconCode)
        {
            $("#background").addClass(iconCodeArr[i].class)
        }
    }
}
function updateCardBackground(iconCode,iconCodeArr){
    j++
    for(var i = 0;i<iconCodeArr.length;i++)
    {
        $("#cardContainer"+j).removeClass(iconCodeArr[i].class)
        if(iconCodeArr[i].code==iconCode)
        {
            $("#cardContainer"+j).addClass(iconCodeArr[i].class)

        }
    }
}
//Parameters for UV to add the class to change background color
//parameters determined by EPA standards for limits
function UVColor(UV) {
    if (UV >= 11) {
        $("#UVBox").removeClass("none low moderate high veryHigh").addClass("extreme")
    } else if (UV >= 8) {
        $("#UVBox").removeClass("none low moderate high extreme").addClass("veryHigh")
    } else if (UV >= 6) {
        $("#UVBox").removeClass("none low moderate veryHigh extreme").addClass("high")
    } else if (UV >= 3) {
        $("#UVBox").removeClass("none low high veryHigh extreme").addClass("moderate")
    } else if (UV > 0) {
        $("#UVBox").removeClass("none moderate high veryHigh extreme").addClass("low")
    } else if (UV == 0) {
        $("#UVBox").removeClass("low moderate high veryHigh extreme").addClass("none")
    }
}
//Creates the card section for 5 day forcast
function forecast() {
    if (flag == 1) {
        return
    }
    else {
        $("<section>").attr({ "id": "forecastContainer", "class": "", "style": "padding:0px" }).appendTo("#dailyContainer")
        $("<h3>").text("5-Day-Forecast").attr({ "id": "forecastHeader", "class": "text-center" }).appendTo("#forecastContainer")
        $("<div>").attr({ "id": "cardDeck", "class": "card-deck" }).appendTo("#forecastContainer")
    }
}
//Creates first instance of 5 day weather, if flag 1 updates the data 
function forecastData(i, projectionDate, projectionIcon, projectionTemp, projectionWind, projectionHumidity) {
    if (flag == 1) {
        updateForecast(i, projectionDate, projectionIcon, projectionTemp, projectionWind, projectionHumidity)
    }
    else {
        $("<div>").attr({ "id": "cardContainer" + i, "class": "card ml-1 mr-1 text-center" }).appendTo("#cardDeck")
        $("<h5>").text(projectionDate).attr({ "id": "cityDateProjection" + i, "class": "" }).appendTo("#cardContainer" + i)
        $("<img>").attr({ "id": "iconProjection" + i, "src": projectionIcon }).appendTo("#cityDateProjection" + i)
        $("<h6>").text("Temp:" + "\xa0" + projectionTemp + "\u00B0F").attr({ "id": "Temperature" + i, "class": "" }).appendTo("#cardContainer" + i)
        $("<h6>").text("Wind:" + "\xa0" + projectionWind + "\xa0" + "MPH").attr({ "id": "Wind" + i, "class": "" }).appendTo("#cardContainer" + i)
        $("<h6>").text("Humidity:" + "\xa0" + projectionHumidity + "\xa0" + "%").attr({ "id": "Humidity" + i, "class": "" }).appendTo("#cardContainer" + i)
    }
}
//Updates 5 day weather values with searched or history city
function updateForecast(i, projectionDate, projectionIcon, projectionTemp, projectionWind, projectionHumidity) {
    $("#cityDateProjection" + i).text(projectionDate)
    $("<img>").attr({ "id": "iconProjection" + i, "src": projectionIcon }).appendTo("#cityDateProjection" + i)
    $("#Temperature" + i).text("Temp:" + "\xa0" + projectionTemp + "\u00B0F")
    $("#Wind" + i).text("Wind:" + "\xa0" + projectionWind + "\xa0" + "MPH")
    $("#Humidity" + i).text("Humidity:" + "\xa0" + projectionHumidity + "\xa0" + "%")
}
//Creates main section 
function main() {
    $("<main>").attr({ "id": "mainContainer", "class": "row" }).appendTo(document.body)
    citySearch()
    searchHistory()
    loadData(cityNameArr)
}
//Assigns city name to what the user input
function assignSearchName() {
    cityName = $("#cityInput").val()
    return cityName
}
//populates teh arras from local storage and what the user submitted
function populateButtonArr() {
    for (var i = 0; i < localStorage.length; i++) {
        cityNameArr[i] = localStorage.getItem("savedCities" + i)
        buttonArr[i] = $("#citySubmit" + i)
    }
}
//main function that pulls data from API and calls the function within, does catch for errors
//retrieves latitude and logitude and passes it into the next API to pull the rest of the data
function getWeather() {
    WEATHER_SEARCH_API = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${cityName}&appid=${API_KEY}`
    fetch(WEATHER_SEARCH_API).then(function (response) {
        return response.json()
    }).then(function (data) {
        var lat = data.coord.lat
        var lon = data.coord.lon
        WEATHER_SEARCH_API = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${lat}&lon=${lon}&appid=${API_KEY}`
        return fetch(WEATHER_SEARCH_API)
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        var temp = data.current.temp
        var wind = data.current.wind_speed
        var humidity = data.current.humidity
        var UV = data.current.uvi
        var icon = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
        var iconCode = data.current.weather[0].icon
        dailyContents(cityName, currentDate, icon, temp, wind, humidity, UV)
        updateBodyBackground(iconCode,iconCodeArr)
        forecast()
        for (var i = 1; i <= forecastProjection; i++) {
            var projectionDate = new Date(data.daily[i].dt * 1000)
            var projectionDate = projectionDate.toLocaleDateString("en-US")
            var projectionDate = " (" + projectionDate + ") "
            var projectionIcon = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`
            var iconCode = data.daily[i].weather[0].icon
            var projectionTemp = data.daily[i].temp.day
            var projectionWind = data.daily[i].wind_speed
            var projectionHumidity = data.daily[i].humidity
            forecastData(i, projectionDate, projectionIcon, projectionTemp, projectionWind, projectionHumidity)
            updateCardBackground(iconCode,iconCodeArr)
        }
        flag = 1
        j=0
    }).catch(function (error) {
        errorFlag = 1
        alert("Please Enter a Valid City Name")
    })
}
//saves data to local storage
function saveData(cityName, i) {
    localStorage.setItem("savedCities" + i, cityName)
}
//loads data to users page dynamically
function loadData(cityNameArr) {
    for (var i = 0; i < localStorage.length; i++) {
        cityNameArr[i] = localStorage.getItem("savedCities" + i)
        $("<button>").text(cityNameArr[i]).attr({ "id": "citySubmit" + i, "type": "button", "class": "col clicked" }).appendTo("#searchContainer")
    }
    onButtonClick()
}
//on page reload, load last saved item in search history
function loadPrevious(buttonArr) {
    if (localStorage.length > 0) {
        cityName = buttonArr[localStorage.length - 1][0].firstChild.data
        getWeather()
    }
}
//saves data that is not empty form the input
function savingValidData(cityName) {
    addSearch(localStorage.length)
    saveData(cityName, localStorage.length)
    populateButtonArr()
    onButtonClick()
    saveFlag = 0
}
//runs the program
function startProgram() {
    header()
    main()
    populateButtonArr()
    onButtonClick()
    loadPrevious(buttonArr)
}
//program runs
startProgram()
//reads input and loads data after search button click
$("#citySubmit").on("click", function () {
    cityName = assignSearchName()
    if (cityName == "" || cityName == undefined) {
        errorFlag = 1
        alert("Enter a valid city")
    }
    else {
        errorFlag = 0
        getWeather()
    }
    if (errorFlag == 0) {
        savingValidData(cityName)
    }
});
//Reads button clicks from history and loads data
function onButtonClick() {
    for(var i = 0;i<iconCodeArr.length;i++)
    {
            $("#background").removeClass(iconCodeArr[i].class)
    }
    saveFlag = 1;
    for (i = 0; i < localStorage.length; i++)
        $("#citySubmit" + i).click(function (buttonArr) {
            cityName = buttonArr.currentTarget.outerText
            getWeather()
        });
}
