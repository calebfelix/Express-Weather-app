const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');

const app = express();
const apiKey = "87de4b3eba4d7d554106c0b0d2a32dc0"
port = process.env.PORT || 5000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/",  (req, res) => {
    res.render("index", { data: null, error: null });
  });

  app.post("/", async (req, res) => {
     const loc = req.body.Location
try{
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`;
     const data = await axios.get(url);
     console.log(data.data)
     res.render("index", { data : data.data, error: null });
    } catch(err){
        res.render("index", { data : null, error: err });
    }
  });

app.listen(port, function () {
    console.log("Weather app listening on port 5000!");
  });