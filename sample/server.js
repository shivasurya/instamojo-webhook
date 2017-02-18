var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var instamojoWebhook = require("./index");

app.use(bodyParser());
var instamojoMiddleWare = instamojoWebhook({ secretKey: '270afc61a4ec4307a89a0bb8ebc1512b'});

app.post("/",instamojoMiddleWare,function(req,res){
  console.log(req.instamojo);
  res.send("hello");
})
http.createServer(app).listen(8082);
