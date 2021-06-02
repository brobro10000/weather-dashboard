const forecastProjection = 5;
const API_KEY = '7e237dd70a479b475daf29b07da4813a'
var WEATHER_SEARCH_API = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${cityName}&appid=${API_KEY}`
var cityName
var cityNameArr = {}
var buttonArr = []
var flag = 0;
var saveFlag=0;
var currentDate= new Date().toLocaleDateString("en-US")
currentDate = " (" +currentDate+ ") "

function header() {
    $("<header>").attr({ "id": "headerContainer" }).appendTo(document.body)
    return $("<h1>").text("Weather Dashboard").attr({ "class": "weatherHeader" }).appendTo("#headerContainer")
}

function citySearch() {
    $("<aside>").attr({ "id": "asideContainer", "class": "col-3" }).appendTo("#mainContainer")
    $("<h3>").text("Search for a City:").attr({ "class": "asideHeader" }).appendTo("#asideContainer")
    $("<input>").attr({ "id": "cityInput", "class": "col" }).appendTo("#asideContainer")
    $("<button>").text("Search").attr({ "id": "citySubmit", "type": "button", "class": "col clicked" }).appendTo("#asideContainer")
}
function addSearch(i){
    $("<button>").text(cityName).attr({ "id": "citySubmit"+(i), "type": "button", "class": "col clicked" }).appendTo("#asideContainer")
    onButtonClick()
}

function dailyContents(cityName, date, icon, temp, wind, humidity, UV) {
    if(flag == 1)
    {
        updateDaily(cityName, date, icon, temp, wind, humidity, UV)
    }
    else {
    $("<section>").attr({ "id": "dailyContainer", "class": "col-9" }).appendTo("#mainContainer")
    $("<h3>").text(cityName + date).attr({ "id": "cityDate" }).appendTo("#dailyContainer")
    $("<img>").attr({ "id": "icon", "src": icon }).appendTo("#cityDate")
    $("<h4>").text("Temp:" + "\xa0" + temp + "\u00B0F").attr({ "id": "Temperature" }).appendTo("#dailyContainer")
    $("<h4>").text("Wind:" + "\xa0" + wind+ "\xa0" + "MPH").attr({ "id": "Wind" }).appendTo("#dailyContainer")
    $("<h4>").text("Humidity:"+ "\xa0" + humidity + "\xa0" + "%").attr({ "id": "Humidity" }).appendTo("#dailyContainer")
    $("<h4>").text("UV Index:").attr({ "id": "UV" }).appendTo("#dailyContainer")
    $("<h5>").text("\xa0"+UV).attr({ "id": "UVBox" }).appendTo("#UV")
    }
}
function updateDaily(cityName, date, icon, temp, wind, humidity, UV) {
    $("#cityDate").text(cityName + date)
    $("<img>").attr({ "id": "icon", "src": icon }).appendTo("#cityDate")
    $("#Temperature").text("Temp:" + "\xa0" + temp + "\u00B0F")
    $("#Wind").text("Wind:" + "\xa0" + wind+ "\xa0" + "MPH")
    $("#Humidity").text("Humidity:"+ "\xa0" + humidity + "\xa0" + "%")
    $("#UVBox").text("\xa0"+UV)
}
function forecast() {
    if(flag == 1)
    {
        return
    } 
    else {
    $("<section>").attr({ "id": "forecastContainer", "class": "", "style": "padding:0px" }).appendTo("#dailyContainer")
    $("<h3>").text("5-Day-Forecast:").attr({ "id": "forecastHeader", "class": "" }).appendTo("#forecastContainer")
    $("<div>").attr({ "id": "cardDeck", "class": "card-deck" }).appendTo("#forecastContainer")
    }
}
function forecastData(i,cityName,projectionDate,projectionIcon,projectionTemp,projectionWind,projectionHumidity) {
    if(flag == 1)
    {
        updateForecast(i,cityName,projectionDate,projectionIcon,projectionTemp,projectionWind,projectionHumidity)
    }
    else {
    $("<div>").attr({ "id": "cardContainer" + i, "class": "card" }).appendTo("#cardDeck")
    $("<h4>").text(cityName + projectionDate).attr({ "id": "cityDateProjection" + i, "class": "" }).appendTo("#cardContainer" + i)
    $("<img>").attr({ "id": "iconProjection"+i, "src": projectionIcon }).appendTo("#cityDateProjection" + i)
    $("<h5>").text("Temp:" + "\xa0" + projectionTemp + "\u00B0F").attr({ "id": "Temperature" + i, "class": "" }).appendTo("#cardContainer" + i)
    $("<h5>").text("Wind:" + "\xa0" + projectionWind+ "\xa0" + "MPH").attr({ "id": "Wind" + i, "class": "" }).appendTo("#cardContainer" + i)
    $("<h5>").text("Humidity:"+ "\xa0" + projectionHumidity + "\xa0" + "%").attr({ "id": "Humidity" + i, "class": "" }).appendTo("#cardContainer" + i)
    }
}
function updateForecast(i,cityName,projectionDate,projectionIcon,projectionTemp,projectionWind,projectionHumidity) {
    $("#cityDateProjection"+i).text(cityName + projectionDate)
    $("<img>").attr({ "id": "iconProjection"+i, "src": projectionIcon }).appendTo("#cityDateProjection" + i)
    $("#Temperature"+i).text("Temp:" + "\xa0" + projectionTemp + "\u00B0F")
    $("#Wind"+i).text("Wind:" + "\xa0" + projectionWind+ "\xa0" + "MPH")
    $("#Humidity"+i).text("Humidity:"+ "\xa0" + projectionHumidity + "\xa0" + "%")
}
function main() {
    $("<main>").attr({ "id": "mainContainer", "class": "row" }).appendTo(document.body)
    citySearch()
    loadData(cityNameArr)
}

function assignSearchName() {
    cityName = $("#cityInput").val()
    return cityName
}
function populateButtonArr() {
    for(var i = 0;i<localStorage.length;i++){
    cityNameArr[i] = localStorage.getItem("savedCities" + i)
    buttonArr[i] = $("#citySubmit"+i)
    }
}

function getWeather() {
    WEATHER_SEARCH_API = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${cityName}&appid=${API_KEY}`
    console.log(cityName)
    fetch(WEATHER_SEARCH_API).then(function (response) {
        return response.json()
    }).then(function (data) {
        var lat = data.coord.lat
        var lon = data.coord.lon
        console.log(lat,lon)
        WEATHER_SEARCH_API = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${lat}&lon=${lon}&appid=${API_KEY}`
        return fetch(WEATHER_SEARCH_API)}).then(function(response){
            return response.json()
    }).then(function(data) {
        console.log(data)
        var temp = data.current.temp
        var wind = data.current.wind_speed
        var humidity = data.current.humidity
        var UV = data.current.uvi
        var icon = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
        dailyContents(cityName, currentDate, icon, temp, wind, humidity, UV)
        forecast()
        for(var i = 1; i<=forecastProjection;i++)
        {
        var projectionDate = new Date(data.daily[i].dt*1000)
        projectionDate = projectionDate.toLocaleDateString("en-US")
        projectionDate = " (" +projectionDate+ ") "
        projectionIcon = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`
        projectionTemp = data.daily[i].temp.day
        projectionWind = data.daily[i].wind_speed
        projectionHumidity = data.daily[i].humidity
        forecastData(i,cityName,projectionDate,projectionIcon,projectionTemp,projectionWind,projectionHumidity)
        }
        flag = 1
    })
    
    //populateButtonArr()
    //onButtonClick()
}
function saveData(cityName,i) {
        console.log(buttonArr)
        localStorage.setItem("savedCities" + i, cityName)
}
function loadData(cityNameArr) {
    for (var i = 0; i < localStorage.length; i++) {
        cityNameArr[i] = localStorage.getItem("savedCities" + i)
        $("<button>").text(cityNameArr[i]).attr({ "id": "citySubmit"+i,"type":"button", "class":"col clicked" }).appendTo("#asideContainer")
    }
    onButtonClick()
}

header()
main()
populateButtonArr()
onButtonClick()

$("#citySubmit").on("click", function () {
    cityName = assignSearchName()
    getWeather()
    addSearch(localStorage.length)
    saveData(cityName, localStorage.length)   
    populateButtonArr() 
    onButtonClick()
    saveFlag=0
});

function onButtonClick(){
    saveFlag = 1;
for(i = 0;i<localStorage.length;i++)
$("#citySubmit"+i).click(function (buttonArr) {
    cityName = buttonArr.currentTarget.outerText
    getWeather()   
});
}