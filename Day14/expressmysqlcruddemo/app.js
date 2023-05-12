// Importing libraries:
const express=require("express");
const app=express();
const bodyparser=require("body-parser")
const path=require("path")
const mysql=require("mysql")
const routes=require("./routes/routers")

// Middleware:
app.use(bodyparser.urlencoded({extended:false}));

//this setting will add .ejs extension to all view files 
//and it will search those files in view folder

// Application Configuration:
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")  

//find all css and js(client side javascript) files in public folder
//public/css contains .css files
//public/js contains all .js files
app.use("/css",express.static(path.resolve(__dirname,"public/css")))
//app.use("/js",express.static(path.resolve(__dirname,"public/js")))
//app.use("/image",express.static(path.resolve(__dirname,"public/image")))

//define route handlers
app.use("/",routes);

//start the server
app.listen(3001,function(){
    console.log("server is running at port 3001");
});

module.exports=app;

/*
Importing libraries:
const express=require("express");
const app=express();
const bodyparser=require("body-parser")
const path=require("path")
const mysql=require("mysql")
const routes=require("./routes/routers")

In this section, the necessary libraries are imported. Express is used for creating the server and defining routes. 
body-parser is middleware used to parse request bodies. 
path is a built-in Node.js module for handling file paths. 
mysql is a library for connecting to a MySQL database. routes is a module containing route handlers.

express: This library is the core of the Express framework and is used for creating the application instance.
body-parser: This middleware is used to parse the request body. It can handle various types of data, including URL-encoded data and JSON.
path: This is a built-in Node.js module that provides utilities for working with file and directory paths.
mysql: This library is used for connecting to a MySQL database and executing SQL queries.
routes: This is a module that contains the route handlers for the application. It is imported from the "./routes/routers" file.
The code snippet initializes the application and assigns it to the app variable using express(). Then, it imports and assigns the necessary middleware and libraries to their respective variables (bodyparser, path, mysql, routes).

These imported libraries and modules will be used further in the code to configure the application, define routes, and start the server. 
*/

/* 
Middleware:
app.use(bodyparser.urlencoded({extended:false})); 
Here, the body-parser middleware is configured to parse URL-encoded bodies. This allows the server to handle form submissions.
app.use() is a method in Express that is used to mount middleware functions in the application's request processing pipeline. 
Middleware functions have access to the request and response objects and can perform various operations on them.

body-parser.urlencoded() is a middleware function provided by the body-parser library. 
It is specifically used to parse URL-encoded form data in the request body. The urlencoded() function returns middleware that only parses URL-encoded bodies and no other types of request bodies.

The urlencoded() function accepts an options object as an argument. 
In the provided code, { extended: false } is passed as the options object.
The extended option specifies whether the parser should use the querystring library (false) or the qs library (true) for parsing URL-encoded data. 
The querystring library is a built-in Node.js library for parsing and formatting URL query strings, while the qs library provides more advanced options for parsing and formatting query strings.

By setting extended to false, the querystring library is used. 
This library supports only simple key-value pairs and does not support nested objects or arrays in the URL-encoded data. 
If you set extended to true, the qs library is used, which supports nested objects and arrays in the URL-encoded data.

In summary, the code snippet adds the body-parser middleware to the Express application's middleware stack, specifically for parsing URL-encoded form data. The extended option is set to false, indicating that the querystring library should be used for parsing the URL-encoded data.
*/

/* 
Application Configuration:
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
These lines configure the application's views. The views folder is set as the location for rendering views, and the view engine is set to EJS (Embedded JavaScript), which is a template engine used for generating dynamic HTML.

app.set("views", path.join(__dirname, "views"));
This line sets the path to the directory where the application's views are located. 
The __dirname is a global variable in Node.js that represents the current directory of the script file. 
By using path.join(), it joins the __dirname with the "views" directory name to create the absolute path to the views directory.

app.set("view engine", "ejs");
This line sets the view engine for rendering the views. 
In this case, the view engine is set to "ejs", which stands for Embedded JavaScript. 
EJS is a popular templating engine that allows embedding JavaScript code within HTML markup to dynamically generate the final HTML content.

By configuring the views directory and the view engine, Express is now able to render views using the specified template engine (EJS) and locate the view files in the "views" directory. 
This enables the application to generate dynamic HTML responses by rendering the appropriate EJS templates with data.
*/

/* 
This line uses the app.use() method to define a middleware that handles requests to the "/css" URL path. It serves static files from the specified directory using the express.static() middleware.

Here's a breakdown of the code:

"/css": This is the URL path prefix for which the static file server is being set up. Any request that starts with "/css" will be handled by this middleware.

express.static(): This function creates a middleware that serves static files. It takes the directory path as an argument and returns the middleware function.

path.resolve(__dirname, "public/css"): This constructs the absolute path to the directory where the CSS files are stored. __dirname is a global variable in Node.js that represents the current directory of the script file. path.resolve() is used to resolve the absolute path by joining the __dirname with the relative path "public/css".

By using express.static() middleware and specifying the "/css" URL path, the CSS files located in the "public/css" directory can be accessed by clients. For example, if there is a CSS file named "styles.css" inside the "public/css" directory, it can be accessed by requesting "/css/styles.css" in the browser.

This allows the application to serve static CSS files that can be included in HTML templates to style the rendered views.
*/