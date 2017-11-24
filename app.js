var express = require("express");
var user = require("./routes/users");
var routes=require("./routes/");
var http = require("http");
var path = require("path");
//var mongo = require('mongodb');
//var methodOverride = require("method-override");
var app = express();
var bodyParser=require("body-parser");

//setting up environments
app.set("port", process.env.PORT || 8080);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

var MongoClient = require('mongodb').MongoClient;
var mongoose=require("mongoose");

var url = "mongodb://localhost:27017/boxinvasion";

global.db=MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
   // db.close();
});
//set port for my application

app.set("port",(8080));
app.listen(app.get("port"),function () {
    console.log("My server is started on the port "+ app.get("port"));

});

app.get("/", routes.index);//call for main index page
app.get("/login", routes.index);//call for login page
