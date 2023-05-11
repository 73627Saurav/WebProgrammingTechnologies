// Importing the express module
const express = require("express");
// In this line, we import the Express module, which is required to create an Express application and define routes and middleware.

// Creating an Express application
const app = express();
/* 
This line creates an instance of the Express application by calling the express() function. 
We assign this instance to the variable app, which we'll use to configure and define routes for our application. */


// Defining a middleware function
app.use(function (req, resp, next) {
    console.log("in first middleware");
    next();
});
/* 
Here, we define a middleware function using app.use(). 
This middleware function will be executed for every incoming request. 
In this example, it logs a message to the console and then calls the next() function to pass control to the next middleware in the chain. */


// Defining a route handler for the "/home" path
app.get("/home", function (req, resp) {
    resp.send("<h1>Hello, World!</h1>");
});
/* 
This code defines a route handler for the GET request on the "/home" path. 
When a client makes a GET request to "/home", the callback function specified here will be executed. 
In this example, it sends the HTML response "<h1>Hello World</h1>" back to the client using resp.send(). */


// Defining a route handler for the "/aboutus" path
app.get("/aboutus", function (req, resp) {
    resp.send("<h1>in about us</h1>");
});
/* 
Similarly, this code defines a route handler for the GET request on the "/aboutus" path. 
When a client makes a GET request to "/aboutus", the specified callback function will be executed.
It sends the HTML response "<h1>in about us</h1>" back to the client. */


// Starting the server and listening on port 3002
app.listen(3001, function () {
    console.log("server started at port 3001");
});
/* 
Finally, this code starts the server and makes it listen on port 3001. 
The callback function is executed when the server starts, and it logs a message to the console indicating that the server has started.
By running this script, you create an Express server that listens on port 3001. 
When clients make requests to the defined paths, the appropriate route handlers are executed and generate responses accordingly. */