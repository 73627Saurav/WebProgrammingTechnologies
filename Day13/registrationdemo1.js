const http = require("http");
const url = require("url");
const fs = require("fs");
const m2 = require("./module2")

const server = http.createServer(function (req, resp) {
    resp.writeHeader(200, { "content-type": "text/html" })
    var q = url.parse(req.url, true)
    switch (q.pathname) {

        case "/home":
            var rs = fs.createReadStream("./public/registeration.html");
            rs.pipe(resp);
            break;

        case "/register":
            var ob = { name: q.query.name, addr: q.query.addr, uname: q.query.uname, passwd: q.query.pass }
            var status = m2.adduser(ob);
            if (status) {
                resp.write("<h1>successful registration</h1>")
            }
            else {
                resp.write("<h1>duplicate user name</h1>")
            }
            resp.write("<a href='/login'>login</a><br>")
            resp.end("<a href='/home'>register me</a><br>")
            break;

        case "/login":
            var rs1 = fs.createReadStream("./public/loginform.html");
            rs1.pipe(resp);
            break;

        case "/validate":
            var ob = { uname: q.query.uname, pass: q.query.pass }
            var user = m2.validateuser(ob);
            if (user != null) {
                resp.write("<h1>successful Login</h1>")
                resp.write("<h1>welcome " + user.name + "</h1>")
            } else {
                resp.write("<h1>unsuccessful Login</h1>")
            }
            resp.write("<a href='/login'>login</a><br>")
            resp.end("<a href='/home'>resgister me</a><br>")
            break;
    }
})

server.listen(3001, function () {
    console.log("server running on port 3001")

})

/*
const server = http.createServer(function (req, resp) { ... }): 
This line creates an HTTP server using the http.createServer() method. 
It takes a callback function as an argument, which will be executed whenever a request is made to the server.

resp.writeHeader(200, { "content-type": "text/html" }): 
This line sets the response header with a status code of 200 (indicating a successful response) and the content type as "text/html". 
It informs the client that the response will be in HTML format.

var q = url.parse(req.url, true): 
This line uses the url.parse() method to parse the requested URL from the req object. 
It extracts information about the URL, including the pathname and query parameters. The parsed URL is stored in the q variable.

switch (q.pathname) { ... }: 
This line initiates a switch statement based on the pathname extracted from the parsed URL. It determines the specific case to execute based on the pathname.

case "/home":
This code block is executed when the requested pathname is "/home". It handles the request for the home page.
The first line creates a readable stream rs using fs.createReadStream() to read the contents of the file registeration.html. 
The file path is specified as "./public/registeration.html".
The next line rs.pipe(resp) pipes the content of the rs stream to the resp object. 
This means that the content of the HTML file will be sent as the response to the client.
Finally, the break statement is used to exit the switch statement and prevent further case evaluations.
In summary, when the "/home" route is requested, the code reads the contents of the registeration.html file using a readable stream, and then pipes the content as the response to the client. 
This allows the client to see the HTML content of the home page.

case "/register": 
This code block is executed when the requested pathname is "/register". 
It handles the registration process based on the submitted form data.

var ob = { name: q.query.name, addr: q.query.addr, uname: q.query.uname, passwd: q.query.pass }
The first line creates an object ob that contains the form data submitted via the query parameters. 
The properties of the ob object correspond to the name, addr, uname, and passwd values extracted from q.query.

var status = m2.adduser(ob);
The next line calls a function m2.adduser(ob), passing the ob object as an argument. 
This function is assumed to handle the registration process and returns a status indicating the success or failure of the registration.

if (status) {
    resp.write("<h1>successful registration</h1>")
}
The if statement checks the value of status. If it evaluates to true, it means the registration was successful. 
In that case, it writes the message <h1>successful registration</h1> to the response using resp.write().

else {
    resp.write("<h1>unsuccessful Login</h1>")
}
If status is false, it means that a duplicate username was detected. 
In that case, it writes the message <h1>duplicate username</h1> to the response.

resp.write("<a href='/login'>login</a><br>")
resp.end("<a href='/home'>register me</a><br>")

The following two lines of code write HTML links to the response. 
The first line writes an anchor tag <a> with the text "login" and the href attribute set to "/login". 
This provides a link for the user to navigate to the login page.
The next line writes an anchor tag <a> with the text "register me" and the href attribute set to "/home". 
This provides a link for the user to return to the registration page.
Finally, the resp.end() method is called to end the response, and the provided content is sent to the client. 
It includes the HTML links created above.

The break statement is used to exit the switch statement and prevent further case evaluations.
In summary, when the "/register" route is requested, the code processes the submitted form data, checks the registration status, and generates an appropriate response. 
It writes success or failure messages, provides links to navigate to the login and registration pages, and sends the response to the client. 

case "/login":
    var rs1 = fs.createReadStream("./public/loginform.html");
    rs1.pipe(resp);
    break;
This code block is executed when the requested pathname is "/login". It handles the request for the login page.
The first line creates a readable stream rs1 using fs.createReadStream() to read the contents of the file loginform.html. 
The file path is specified as "./public/loginform.html".
The next line rs1.pipe(resp) pipes the content of the rs1 stream to the resp object. 
This means that the content of the HTML file will be sent as the response to the client.
Finally, the break statement is used to exit the switch statement and prevent further case evaluations.
In summary, when the "/login" route is requested, the code reads the contents of the loginform.html file using a readable stream, and then pipes the content as the response to the client. 
This allows the client to see the HTML content of the login form.

case "/validate":
This code block is executed when the requested pathname is "/validate". 
It handles the request for user validation during the login process.
 
var ob = { uname: q.query.uname, pass: q.query.pass };
The first line creates an object ob with properties uname and pass. 
These properties are extracted from the q.query object, which contains the query parameters from the URL. 
The uname property is assigned the value of q.query.uname, and the pass property is assigned the value of q.query.pass.

var user = m2.validateuser(ob);
The next line var user = m2.validateuser(ob) invokes the validateuser function from m2 module and passes the ob object as an argument. 
This function is responsible for validating the user based on the provided username and password. 
It returns the user object if the validation is successful, or null otherwise. The returned value is stored in the user variable.

if (user != null) {
    resp.write("<h1>successful Login</h1>");
    resp.write("<h1>welcome " + user.name + "</h1>");
} 
The if statement checks if the user object is not null, indicating a successful login. 
If the condition is true, the following lines of code will be executed.
resp.write("<h1>successful Login</h1>") writes the HTML code <h1>successful Login</h1> to the response object (resp). 
This line sends this HTML content to the client as part of the response.
resp.write("<h1>welcome " + user.name + "</h1>") writes another HTML code to the response object. 
This line dynamically generates an HTML heading that includes the user's name. 
It concatenates the string "<h1>welcome " with the user.name property, which contains the user's name, and then appends the closing </h1> tag. 
This line also sends the generated HTML content to the client as part of the response.

else {
    resp.write("<h1>unsuccessful Login</h1>");
}
If the user object is null, indicating an unsuccessful login, the else block will be executed. 
It writes the HTML code <h1>unsuccessful Login</h1> to the response object (resp), informing the client about the unsuccessful login.

resp.write("<a href='/login'>login</a><br>");
The next line resp.write("<a href='/login'>login</a><br>") writes an HTML anchor tag to the response object. 
This tag creates a hyperlink that links to the login page ("/login"). 
It allows the user to navigate back to the login page if needed. 
This line sends the HTML content to the client as part of the response.

resp.end("<a href='/home'>register me</a><br>");
Finally, the line resp.end("<a href='/home'>register me</a><br>") writes an HTML anchor tag to the response object. 
This tag creates a hyperlink that links to the registration page ("/home"). 
It allows the user to navigate to the registration page to register if they haven't done so already. 
This line sends the HTML content to the client as part of the response.

In summary, when the "/validate" route is requested, the code validates the user based on the provided username and password. 

*/