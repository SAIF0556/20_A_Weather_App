const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { response } = require('express');
const app = express();

//bodyparser
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})


app.post("/", (req, res) => {
    const apikey = "aab5023505737f57be457132c58c34c0";
    const city_name = req.body.city;
    var temp1;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +
        city_name + "&units=metric" + "&appid=" + apikey;
    https.get(url, (response) => {
        response.on("data", function (data) {
            const WeatherData = JSON.parse(data);
            temp1 = WeatherData.main.temp;
            const icon = WeatherData.icon;
            console.log(icon);
            res.write("<p>The temperature in " + city_name + " is " + temp1 + " celcius</p>");
            res.send();
        })
    })
})
app.listen(3000, () => {
    console.log("starting...");
});