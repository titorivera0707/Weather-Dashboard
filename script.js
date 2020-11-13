
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
});

  var queryURL5 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=30b6b2806250637e3cf7ca1b25aa6a9f"
  
  $.ajax({
      url: queryURL5,
      method: "GET"
    }).then(function(res5) {
      console.log(res5);

    for(i = 1; i < 6; i++) {
      var day1 = $("<div class='col'>")
      var img = $("<img>")
      var dateForecast = $("<h3>").text()
      var temp5 = $("<p>").text(res5.daily[i].temp.day)
      var humi5 = $("<p>")
      $(".forecast5").append(day1)
      $(day1).append(img, dateForecast, temp5, humi5)


    }
  });
});
});
