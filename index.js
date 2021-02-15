const express = require("express");
const http = require("http")
const bodyParser = require("body-parser")
const app = express();


app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {


  const query = req.body.cityName;
  const apiKey = "b4744aaecc9613a7cb9bbcdd06ae32a1";
  const unit = "metric";
  var url = "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "#"

  http.get(url, function(response) {
    console.log(response);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const descr = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const img = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log("temp = " + temp + ", decsription = " + descr + ".");
      res.write("<html>")
      res.write("<p>weather Report. </p>")
      res.write("Weather Description : .... <em>" + descr + "</em> ")
      res.write("<br>")
      res.write("<img src=" + img + ">");
      res.write("<h1>The Temperature in " + query + " is " + temp + " degrees celcius.</h1>")
      res.write("<html>")
      res.send()
    });
  });
});





app.listen(3000, function(req, res) {
  console.log("server is running on port 3000");

})
