
    // var cityName = $("<h3>").text(response.name)
    // var temperature = $("<h6>").text(response.main.temp)
    // var humidity = $("<h6>").text(response.main.humidity)
    // var windspeed = $("<h6>").text(response.wind.speed)
    // var uvIndex = $("<h6>").text()

var coords = {};

$("#searchBtn").on("click", function(event){
  event.preventDefault();
  var today = new Date();
  var date = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var cityName = $("#citySearch").val();
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=30b6b2806250637e3cf7ca1b25aa6a9f";
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
  console.log(response)
  var fahrenheit = response.main.temp * 9/5 - 459.67
    $(".cityName").text(response.name + " (" + month + "/" + date + "/" + year + ")");
    $(".conditions").text("Conditions: " + response.weather[0].main)
    $(".temperature").text("Temperature: " + Math.round(fahrenheit) + " °F");
    $(".humidity").text("Humidity: " + response.main.humidity + "%");
    $(".windspeed").text("Wind Speed: " + response.wind.speed + " MPH");
  var latitude = response.coord.lat
  var longitude = response.coord.lon
  console.log(typeof(longitude))
  var queryURL1 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=30b6b2806250637e3cf7ca1b25aa6a9f"
  $.ajax({
    url: queryURL1,
    method: "GET"
}).then(function(uvRes) {
  console.log(uvRes)

  $(".uvindex").text("UV Index: " + uvRes.value)

  if (uvRes.value > 0 && uvRes.value <= 2.5){
    $(".uvindex").addClass("green")
  }
  if (uvRes.value > 2.5 && uvRes.value <= 5.5){
    $(".uvindex").addClass("yellow")
  }
  if (uvRes.value > 5.5 && uvRes.value <= 7.5){
    $(".uvindex").addClass("orange")
  }
  if (uvRes.value > 7.5) {
    $(".uvindex").addClass("red")
  }
  
});

  var queryURL5 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=30b6b2806250637e3cf7ca1b25aa6a9f"
  
  $.ajax({
      url: queryURL5,
      method: "GET"
    }).then(function(res5) {
      console.log(res5);

    for(i = 1; i < 6; i++) {
      var day1 = $("<div class='col blue'>")
      var img = $("<img>")
      var date5 = date++ + 1
      var dateForecast = $("<h5>").text(" (" + month + "/" + date5 + "/" + year + ")")
      var temp5 = $("<p>").text("Temp: " + Math.round(res5.daily[i].temp.day) + "°F")
      var conds5 = $("<p>").text("Conditions: " + res5.daily[i].weather[0].main)
      var humi5 = $("<p>").text("Humidity: " + res5.daily[i].humidity + "%")
      $(".forecast5").append(day1)
      $(day1).append(img, dateForecast, temp5, conds5, humi5)


    }
  });
});
});
