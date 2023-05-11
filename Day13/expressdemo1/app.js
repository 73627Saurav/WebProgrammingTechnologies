//import module
const express=require("express");
//create express object
const app=express();

//define all middlewares
app.use(function(req,resp,next){
    console.log("in first middleware");
    next();
})

//configure express object


// define request handlers
app.get("/home",function(req,resp){
    
    resp.send("<h1>Hello World</h1>")
})
app.get("/aboutus",function(req,resp){
    resp.send("<h1>in about us</h1>")
})

//start the server
app.listen(3002,function(){
    console.log("server started at port 3002")
})