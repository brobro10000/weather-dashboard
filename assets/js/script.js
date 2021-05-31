const forecastProjection = 5;

function header() {
    $("<header>").attr({ "id": "headerContainer" }).appendTo(document.body)
    return $("<h1>").text("Weather Dashboard").attr({ "class": "weatherHeader" }).appendTo("#headerContainer")
}

function citySearch() {
    $("<aside>").attr({ "id": "asideContainer", "class": "col-3" }).appendTo("#mainContainer")
    $("<h3>").text("Search for a City:").attr({ "class": "asideHeader" }).appendTo("#asideContainer")
    $("<input>").attr({ "id": "cityInput", "class": "col" }).appendTo("#asideContainer")
    $("<button>").text("Search").attr({ "id": "citySubmit", "type": "button", "class": "col" }).appendTo("#asideContainer")
}

function dailyContents() {
    $("<section>").attr({ "id": "dailyContainer", "class": "col-9" }).appendTo("#mainContainer")
    $("<h3>").text("City + Date + Icon").attr({ "id": "cityDateIcon" }).appendTo("#dailyContainer")
    $("<h4>").text("Temperature").attr({ "id": "Temperature" }).appendTo("#dailyContainer")
    $("<h4>").text("Wind").attr({ "id": "Wind" }).appendTo("#dailyContainer")
    $("<h4>").text("Humidity").attr({ "id": "Humidity" }).appendTo("#dailyContainer")
    $("<h4>").text("UV Index").attr({ "id": "UV" }).appendTo("#dailyContainer")
}

function forecast() {
    $("<section>").attr({ "id": "forecastContainer", "class": "", "style": "padding:0px" }).appendTo("#dailyContainer")
    $("<h3>").text("5-Day-Forecast:").attr({ "id": "forecastHeader", "class": "" }).appendTo("#forecastContainer")
    $("<div>").attr({ "id": "cardDeck", "class": "card-deck" }).appendTo("#forecastContainer")
    for (var i = 0; i < forecastProjection; i++) {
        $("<div>").attr({ "id": "cardContainer" + i, "class": "card" }).appendTo("#cardDeck")
        $("<h4>").text("City + Date + Icon").attr({ "id": "cityDateIcon" + i, "class": "" }).appendTo("#cardContainer" + i)
        $("<h5>").text("Temperature").attr({ "id": "Temperature" + i, "class": "" }).appendTo("#cardContainer" + i)
        $("<h5>").text("Wind").attr({ "id": "Wind" + i, "class": "" }).appendTo("#cardContainer" + i)
        $("<h5>").text("Humidity").attr({ "id": "Humidity" + i, "class": "" }).appendTo("#cardContainer" + i)
    }
}
function main() {
    $("<main>").attr({ "id": "mainContainer", "class": "row" }).appendTo(document.body)
    citySearch()
    dailyContents()
    forecast()
}

header()
main()