$("#inputButton").on("click", function(getData) {
    event.preventDefault();
const city = $("#zip").val().trim();
const queryTerm = $("#artist").val().trim().replace(' ', '-');
const queryURL= "https://api.seatgeek.com/2/events?venue.city=" + city + "&q=" + queryTerm +  "&client_id=OTMwMzkyN3wxNTU2NzI1Njk3Ljg5&client_secret=7028ce9d5083272224af581616c12f706176bb4f82cd4c17b2948857a215f156"

console.log(queryURL);

$.ajax({
url: queryURL,
method: "GET"
}).then(function(response) {

console.log(response);

$(".thing").empty();

if (response.events.length === 0) {
    
    card3 = $(`<div class="thing">`);
    card3.html("Sorry, no shows soon");
    $(".form-inline").append(card3);
}

card1 = $(`<div class="thing">`);
picture = $("<div>");
picture.html(`<img src="${response.events[0].performers[0].image}">`);
card1.append(picture);
$(".form-inline").append(card1);

for (let i=0; i<3; i++) {

card2 = $(`<div class="thing">`);
link = $("<div>");
link.html(`<a href="${response.events[i].url}">${response.events[i].title}</a>`);
card2.append(link);
loc = $("<div>");
loc.html(response.events[i].venue.name + ", " + response.events[i].venue.city + ", " + response.events[i].venue.state);
card2.append(loc);
avg_price = $("<div>");
avg_price.html("Average price of ticket: $" + response.events[i].stats.average_price);
card2.append(avg_price);
lowest_price = $("<div>");
lowest_price.html("Lowest price of ticket: $" + response.events[i].stats.lowest_price);
card2.append(lowest_price);
$(".form-inline").append(card2);
}

});

const weather_url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&appid=27d554f4011ac1308b08df5e12e227d1"

$.ajax({
url: weather_url,
method: "GET"
}).then(function (res) {
console.log(res);
$(".thing2").empty();
let wind = res.list[0].wind.speed;
let humid = res.list[0].main.humidity;
let temp = res.list[0].main.temp;
console.log(temp);
wind_speed = $("<div>");
humidity = $("<div>");
temps = $("<div>");
card4 = $(`<div class="thing2">`);
wind_speed.html("Wind: " + Math.floor(wind*0.621371) + " mph");
humidity.html("Humidity: "+ humid + "%");
temps.html("Temp: " + Math.floor((temp-273.15)*(9/5)+32) + " °F");
console.log(wind_speed);
card4.append(wind_speed);
card4.append(humidity);
card4.append(temps);
$(".form-inline").append(card4);
})

})
