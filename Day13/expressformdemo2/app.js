// Importing the required libraries
const express = require("express");
const bodyParser = require("body-parser");

// Creating an Express application
const app = express();

// Using the body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Defining a route handler for the "/home" path
app.get("/home", function(req, resp) {
    resp.sendFile("public/addition.html", { root: __dirname });
});

// Defining a route handler for the "/submit-data" path
app.get("/submit-data", function(req, resp) {
    const num1 = parseInt(req.query.num1);
    const num2 = parseInt(req.query.num2);
    const addition = num1 + num2;
    resp.send("<h1>Addition: " + addition + "</h1>");
});

// Starting the server and listening on port 3001
app.listen(3001, function() {
    console.log("Server started at port 3001");
});

/* 
const express = require("express");: 
This line imports the Express library, allowing us to create an Express application.

const bodyParser = require("body-parser");: 
This line imports the body-parser middleware. 
It is used to parse the request body of incoming HTTP requests.

const app = express();: 
This creates an instance of the Express application by calling the express() function. 
The app variable represents our Express application.

app.use(bodyParser.urlencoded({ extended: false }));: 
This line adds the body-parser middleware to our Express application.
It is used to parse URL-encoded form data sent in the request body.
The body-parser middleware is used to parse the request body of incoming HTTP requests. 
In this case, it is configured to handle URL-encoded form data.
The urlencoded({ extended: false }) option is passed to the bodyParser.urlencoded middleware function. 
This option specifies how the URL-encoded data should be parsed.

extended: false indicates that the query string library (querystring) should be used to parse the URL-encoded data. 
This library supports only simple key-value pairs and does not support nested objects or arrays.

By using this middleware, when a client submits a form with a method of POST or PUT, 
the body-parser middleware will parse the URL-encoded form data and make it available in the req.body property of the subsequent route handlers.

For example, if a form has input fields with name attributes of "username" and "password", 
and the form is submitted to a route handler, you can access the submitted values using req.body.username and req.body.password.

In summary, app.use(bodyParser.urlencoded({ extended: false })); sets up the middleware to parse URL-encoded form data in the incoming requests and makes the parsed data available in the req.body object.


app.get("/home", function(req, resp) {
    resp.sendFile("public/addition.html", { root: __dirname });
}); 
It defines a route handler for the HTTP GET request method on the "/home" path.
When a client makes a GET request to the "/home" path of the server, the callback function specified as the second argument to app.get() will be executed. 
This function takes two parameters: req (request) and resp (response), which represent the incoming request from the client and the response that will be sent back to the client, respectively.
Inside the callback function, you can define the logic that should be executed when this route is accessed. 
This can include actions such as reading data from a database, rendering a template, or sending a response to the client.
In the provided example, the callback function is used to send a file in the response using the resp.sendFile() method. 
The resp.sendFile() method sends the specified file to the client as the response body. 
In this case, it sends the file "public/addition.html" located in the server's file system.
So, when a client accesses the "/home" route using the GET method, the server will respond by sending the "addition.html" file to the client's browser, which can then render and display the contents of the HTML file.

Note that the path to the file is specified as "public/addition.html" with { root: __dirname } option. 
The __dirname represents the current directory of the script file, and the { root: __dirname } option tells sendFile() to use the current directory as the root directory for resolving the file path.



app.get("/submit-data", function(req, resp) { ... });: 
It defines a route handler for the HTTP GET request method on the "/submit-data" path.
When a client makes a GET request to the "/submit-data" path of the server, the callback function specified as the second argument to app.get() will be executed. 
This function takes two parameters: req (request) and resp (response), which represent the incoming request from the client and the response that will be sent back to the client, respectively.
Inside the callback function, you can define the logic that should be executed when this route is accessed. 
This can include actions such as processing data, interacting with a database, or sending a response to the client.
In the provided example, the callback function is used to retrieve the query parameters from the request using req.query. 
The query parameters can be accessed as properties of the req.query object. 
For example, req.query.num1 and req.query.num2 represent the values of the "num1" and "num2" query parameters, respectively.
The callback function then performs an addition operation on the parsed values of num1 and num2. 
In the given code, the addition result is stored in the addition variable.
Finally, the server sends a response to the client using resp.send(). 
It sends an HTML response containing the addition result using string interpolation to include the addition value in the HTML.
So, when a client accesses the "/submit-data" route using the GET method and provides the "num1" and "num2" query parameters in the URL, 
the server will respond by sending an HTML response displaying the addition result to the client's browser.


const num1 = parseInt(req.query.num1);
In the provided code, parseInt() is used to convert the value of the "num1" query parameter from a string to an integer.
The req.query object represents the query parameters sent with the request. 
Query parameters are typically included in the URL after a question mark (?) and are separated by ampersands (&). 
For example, in the URL http://example.com/submit-data?num1=10&num2=20, the query parameters are num1=10 and num2=20.
req.query.num1 accesses the value of the "num1" query parameter from the req.query object. 
Since query parameters are passed as strings, the value of req.query.num1 is initially a string.
The parseInt() function is used to parse the string value and convert it to an integer. 
It takes the string as an argument and returns an integer representation of that string.
By assigning the result of parseInt(req.query.num1) to the variable num1, you obtain an integer value that can be used for further calculations or processing in your code.


const num2 = parseInt(req.query.num2); 
This line extracts the value of the "num2" query parameter from the request URL and converts it to an integer using the parseInt() function.

const addition = num1 + num2; 
This line calculates the sum of num1 and num2 and assigns it to the addition variable.

resp.send("<h1>Addition: " + addition + "</h1>"); 
In the provided code, resp.send() is used to send a response back to the client. 
The response contains an HTML string that will be displayed in the browser.
The line resp.send("<h1>Addition: " + addition + "</h1>"); constructs an HTML string by concatenating different parts. 
It uses the + operator to concatenate the static string "<h1>Addition: " with the value of the addition variable, and then appends the closing </h1> tag. 
This creates an HTML heading element that displays the addition result.
The resulting HTML string is passed as an argument to resp.send(), which sends it as the response body to the client. 
When the client receives this response, it will render the HTML and display the addition result in the browser.

By dynamically generating the HTML response, you can display the result of the addition operation in the client's browser based on the input provided in the query parameters.

app.listen(3001, function() {
    console.log("Server started at port 3001");
});
The app.listen() function is used to start the server and make it listen for incoming HTTP requests on a specific port. 
In the provided code, it listens on port 3001.
The line app.listen(3001, function() { specifies that the server should listen on port 3001. 
The second argument is an anonymous callback function that will be executed once the server starts listening.
Inside the callback function, the line console.log("Server started at port 3001"); 
is used to log a message to the console indicating that the server has started successfully and is now listening on the specified port.
When you run the code and see the "Server started at port 3001" message in the console, 
it means that your server is up and running, ready to handle incoming HTTP requests on port 3001.*/