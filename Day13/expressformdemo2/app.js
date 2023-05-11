//import libraries
const express=require("express");
//create object
const app=express();
const bodyparser=require("body-parser")
//const m1=require("./module1"))



//define middlewares
//if you receive any data from form then use following function
//for separating url and the data
app.use(bodyparser.urlencoded({extended:false}))

//configure express objects

//define request handlers
app.get("/home",function(req,resp){
    resp.sendFile("public/addition.html",{root:__dirname});
})
app.get("/submit-data",function(req,resp){
    //var ans=m1.addition(parseInt(req.query.num1),parseInt(req.query.num2))
    //resp.send("<h1>num1: "+req.query.num1+" num2 :"+req.query.num2+" Answer : "+ans+"</h2>")
    resp.send("<h1>num1: "+req.query.num1+" num2 :"+req.query.num2+"</h2>")
})
//start the server
app.listen(3002);