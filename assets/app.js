$(".is-warning").on("click", function (getData) {

    event.preventDefault();
    var city = $(".is-primary").val().trim();
    var queryTerm = $(".is-success").val().trim().replace(' ', '-');

    if (queryTerm) {

        looking();

    }

    else if (city) {

        looking();

    }

});

$(document).keypress(function (e) {

    if (e.which == 13) {

        event.preventDefault();
        var city = $(".is-primary").val().trim();
        var queryTerm = $(".is-success").val().trim().replace(' ', '-');

        if (queryTerm) {

            looking();

        }

        else if (city) {

            looking();

        }

    };

});

function looking() {

    var city = $(".is-primary").val().trim();
    var queryTerm = $(".is-success").val().trim().replace(' ', '-');

    if (city) {

        var queryURL = "https://api.seatgeek.com/2/events?venue.city=" + city + "&q=" + queryTerm + "&client_id=OTMwMzkyN3wxNTU2NzI1Njk3Ljg5&client_secret=7028ce9d5083272224af581616c12f706176bb4f82cd4c17b2948857a215f156"

    }

    else {

        var queryURL = "https://api.seatgeek.com/2/events?" + "&q=" + queryTerm + "&client_id=OTMwMzkyN3wxNTU2NzI1Njk3Ljg5&client_secret=7028ce9d5083272224af581616c12f706176bb4f82cd4c17b2948857a215f156"

    }


    
    $(".element").empty();
    $(".thing").empty();
    $(".column").remove();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        

        if (response.events.length === 0) {

            card3 = $(`<div class="column" id="centers">`);
            box = $(`<div id="centered">`);
            box.html("Sorry, no shows soon");
            card3.append(box);
            $(".columns").append(card3);
        }

        if (response.events[0].performers[0].image !== null) {

            card1 = $(`<div class="column">`);
            picture = $(`<div>`);
            picture.html(`<img src="${response.events[0].performers[0].image}">`);
            card1.append(picture);
            $(".columns").append(card1);

        }

        else if (response.events[1].performers[0].image !== null) {

            card1 = $(`<div class="column">`);
            picture = $(`<div>`);
            picture.html(`<img src="${response.events[1].performers[0].image}">`);
            card1.append(picture);
            $(".columns").append(card1);
        }

        else if (response.events[2].performers[0].image !== null) {

            card1 = $(`<div class="column">`);
            picture = $(`<div>`);
            picture.html(`<img src="${response.events[2].performers[0].image}">`);
            card1.append(picture);
            $(".columns").append(card1);

        }

        for (let i = 0; i < 3; i++) {

            card2 = $(`<div class="column">`);
            green3 = $(`<div class="green">`);
            link = $(`<div class="element">`);
            link.html(`<a href="${response.events[i].url}"target="_blank">${response.events[i].title}</a>`);
            green3.append(link);
            loc = $(`<div class="element">`);

            if (response.events[i].venue.state === null) {

                loc.html(response.events[i].venue.name + ", " + response.events[i].venue.city);
            }

            else {
                loc.html(response.events[i].venue.name + ", " + response.events[i].venue.city + ", " + response.events[i].venue.state);
            }

            green3.append(loc);
            avg_price = $(`<div class="element">`);

            if (response.events[i].stats.average_price === null) {

                avg_price.html("Average price of ticket: N/A");
            }

            else {

                avg_price.html("Average price of ticket: $" + response.events[i].stats.average_price);
            }

            green3.append(avg_price);

            lowest_price = $(`<div class="element">`);

            if (response.events[i].stats.lowest_price === null) {

                lowest_price.html("Lowest price of ticket: N/A");
            }

            else {

                lowest_price.html("Lowest price of ticket: $" + response.events[i].stats.lowest_price);
            }

            green3.append(lowest_price);
            date = $(`<div class="element">`);
            date2 = response.events[i].datetime_local;

            if ((date2[11] + date2[12]) > 12) {

                date3 = date2[5] + date2[6] + "/" + date2[8] + date2[9] + "/" + date2[0] + date2[1] + date2[2] + date2[3] + " " + ((date2[11] + date2[12]) - 12) + date2[13] + date2[14] + date2[15];
            }

            else {

                date3 = date2[5] + date2[6] + "/" + date2[8] + date2[9] + "/" + date2[0] + date2[1] + date2[2] + date2[3] + " " + date2[11] + date2[12] + date2[13] + date2[14] + date2[15];
            }

            date.html(date3);
            green3.append(date);
            card2.append(green3);
            $(".columns").append(card2);
        }

    });

    if (city) {

        const weather_url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&appid=27d554f4011ac1308b08df5e12e227d1"

        $.ajax({
            url: weather_url,
            method: "GET"
        }).then(function (res) {
            console.log(res);
            let wind = res.list[0].wind.speed;
            let humid = res.list[0].main.humidity;
            let temp = res.list[0].main.temp;
            let words = res.list[0].weather[0].description;
            let iconcode = res.list[0].weather[0].icon;
            wind_speed = $(`<div class="element">`);
            humidity = $(`<div class="element">`);
            temps = $(`<div class="element">`);
            wordss = $(`<div class="element">`);
            card4 = $(`<div class="column">`);
            green4 = $(`<div class="green">`);
            icon = $(`<div class="element">`);
            wind_speed.html("Wind: " + Math.floor(wind * 0.621371) + " mph");
            humidity.html("Humidity: " + humid + "%");
            temps.html("Temp: " + Math.floor((temp - 273.15) * (9 / 5) + 32) + " °F");
            let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            picture = $(`<img src=${iconurl}>`)
            wordss.html(words);
            icon.append(picture);
            green4.append(wind_speed);
            green4.append(humidity);
            green4.append(temps);
            green4.append(wordss);
            green4.append(icon);
            card4.append(green4);
            $(".columns").append(card4);
        });
    };
};
