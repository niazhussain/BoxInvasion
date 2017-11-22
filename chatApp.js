var express= require('express');
var path=require('path');
var socket=require("socket.io");
var expjs=require('ejs');

var routes=require('./routes/index');
var users=require('./routes/users');

//initiallize the app
var app=express();


// setting up view engine to tell the system
app.set('views',path.join(__dirname,'views'));
//app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine','ejs');

app.set('port',(3000));
var server=app.listen(app.get("port"),function () {
    console.log('Chat server is started on the port '+ app.get('port'));
});
//Static files
app.use(express.static("public"));
//setup socket

var io=socket(server);
io.on("connection",function(socket){
    console.log("connection created...")
    //listen the message from client
    socket.on("chat",function (data) {
          //have to send data to all connected sockets
        io.sockets.emit("chat",data);
    });
});