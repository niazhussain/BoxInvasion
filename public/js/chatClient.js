//scripting for chatting client
//making socket connection
var socket=io.connect("http://localhost:3000");

//Query to document object model (DOM) ,get element values from index.html
var messageOutput = document.getElementById("message-output");
var client = document.getElementById("name");
var message = document.getElementById("message");
var sendBtn = document.getElementById("send");

//executing event on clicking send btn: by using emit event

sendBtn.addEventListener("click",function () {
   socket.emit("chat",{

       message: message.value,
       client: client.value,
   })
});
//listening event for individual client /front end
socket.on("chat",function (data) {
    messageOutput.innerHTML +="<p><strong>"+ data.client + " :</strong>"+ data.message + "</p>";

})