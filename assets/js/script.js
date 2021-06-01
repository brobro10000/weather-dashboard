const forecastProjection = 5;
const API_KEY = '7e237dd70a479b475daf29b07da4813a'
var WEATHER_SEARCH_API = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${cityName}&appid=${API_KEY}`
var cityName
var currentDate= new Date().toLocaleDateString("en-US")
currentDate = " (" +currentDate+ ") "
var d = new Date(1622510470000);
console.log(d)
d = d.toLocaleDateString("en-US")
console.log(d)

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

function dailyContents(cityName, date, icon, temp, wind, humidity, UV) {
    $("<section>").attr({ "id": "dailyContainer", "class": "col-9" }).appendTo("#mainContainer")
    $("<h3>").text(cityName + date).attr({ "id": "cityDate" }).appendTo("#dailyContainer")
    $("<img>").attr({ "id": "icon", "src": icon }).appendTo("#cityDate")
    $("<h4>").text("Temp:" + "\xa0" + temp + "\u00B0F").attr({ "id": "Temperature" }).appendTo("#dailyContainer")
    $("<h4>").text("Wind:" + "\xa0" + wind+ "\xa0" + "MPH").attr({ "id": "Wind" }).appendTo("#dailyContainer")
    $("<h4>").text("Humidity:"+ "\xa0" + humidity + "\xa0" + "%").attr({ "id": "Humidity" }).appendTo("#dailyContainer")
    $("<h4>").text("UV Index:").attr({ "id": "UV" }).appendTo("#dailyContainer")
    $("<h5>").text("\xa0"+UV).attr({ "id": "UVBox" }).appendTo("#UV")
}

function forecast() {
    $("<section>").attr({ "id": "forecastContainer", "class": "", "style": "padding:0px" }).appendTo("#dailyContainer")
    $("<h3>").text("5-Day-Forecast:").attr({ "id": "forecastHeader", "class": "" }).appendTo("#forecastContainer")
    $("<div>").attr({ "id": "cardDeck", "class": "card-deck" }).appendTo("#forecastContainer")
}
function forecastData(i,cityName,projectionDate,projectionIcon,projectionTemp,projectionWind,projectionHumidity) {
    $("<div>").attr({ "id": "cardContainer" + i, "class": "card" }).appendTo("#cardDeck")
    $("<h4>").text(cityName + projectionDate).attr({ "id": "cityDateProjection" + i, "class": "" }).appendTo("#cardContainer" + i)
    $("<img>").attr({ "id": "iconProjection", "src": projectionIcon }).appendTo("#cityDateProjection" + i)
    $("<h5>").text("Temp:" + "\xa0" + projectionTemp + "\u00B0F").attr({ "id": "Temperature" + i, "class": "" }).appendTo("#cardContainer" + i)
    $("<h5>").text("Wind:" + "\xa0" + projectionWind+ "\xa0" + "MPH").attr({ "id": "Wind" + i, "class": "" }).appendTo("#cardContainer" + i)
    $("<h5>").text("Humidity:"+ "\xa0" + projectionHumidity + "\xa0" + "%").attr({ "id": "Humidity" + i, "class": "" }).appendTo("#cardContainer" + i)
}
function main() {
    $("<main>").attr({ "id": "mainContainer", "class": "row" }).appendTo(document.body)
    citySearch()
    //   dailyContents()
    //   forecast()
}

function assignCityName() {
    cityName = $("#cityInput").val()
    console.log(cityName)
    return cityName
}

function getWeather() {
    WEATHER_SEARCH_API = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${cityName}&appid=${API_KEY}`
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
//         var d = new Date(1622480400000);
// console.log(d)
// d = d.toLocaleDateString("en-US")
// console.log(d)

        var icon = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
        dailyContents(cityName, currentDate, icon, temp, wind, humidity, UV)
        forecast()
        for(var i = 1; i<=forecastProjection;i++)
        {
        var projectionDate = new Date(data.daily[i].dt*1000)
        projectionDate = projectionDate.toLocaleDateString("en-US")
        projectionIcon = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`
        console.log(data.daily[i].weather[0].icon)
        projectionTemp = data.daily[i].temp.day
        projectionWind = data.daily[i].wind_speed
        projectionHumidity = data.daily[i].humidity
        forecastData(i,cityName,projectionDate,projectionIcon,projectionTemp,projectionWind,projectionHumidity)
        }
    })
}

header()
main()

$("#citySubmit").on("click", function () {
    cityName = assignCityName()
    getWeather()
});