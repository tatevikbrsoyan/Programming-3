var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static("."));

app.get("/", function(req, res){
    res.redirect("index.html");
 });
 
 io.on('connection', function (socket) {
    console.log("new connection");
    socket.on('socketIradarcutyuanOrinak', function(data){
       console.log('Iradarcutyun scoketnerum');
       console.log(data);
    });
});


server.listen(3000, function(){
   console.log("My server is working");
});
