const http = require("http");
const url = require("url")
const fs = require("fs")
const m1 = require("./module1")

const server = http.createServer(function (req, resp) {
    var q = url.parse(req.url, true);
    console.log(q);
    console.log(q.pathname);
    console.log(q.query);
    /* Url {
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: null,
        query: [Object: null prototype] {},
        pathname: '/',
        path: '/',
        href: '/'
      }
      Url {
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: null,
        query: [Object: null prototype] {},
        pathname: '/favicon.ico',
        path: '/favicon.ico',
        href: '/favicon.ico'
      } */
    resp.writeHeader(200, { "content-type": "text/html" })
    switch (q.pathname) {
        case "/home":
            var rs = fs.createReadStream("./public/addition.html");
            rs.pipe(resp);
            break;
        
        case "/submit-data":
            resp.write("num1: " + q.query.num1 + "<br>")
            resp.write("btn: " + q.query.btn + "<br>")
            if (q.query.btn === "add") {
                resp.write("num2: " + q.query.num2 + "<br>")
                var ans = m1.addition(parseInt(q.query.num1), parseInt(q.query.num2))
                resp.end("Addition : " + ans);
            } else {
                var ans = m1.factorial(parseInt(q.query.num1))
                resp.end("Factorial : " + ans);
            }
            break;
        
        default:
            resp.write("<h2>on some other page</h2>");
            resp.end();
    }
})

server.listen(3001, function () {
    console.log("server running at port 3001")
})

/* 
const http = require("http");
This line imports the built-in http module, which provides functionality for creating HTTP servers and making HTTP requests.

const url = require("url");
This line imports the built-in url module, which helps in parsing URL strings and working with URL components.

const fs = require("fs");
This line imports the built-in fs module, which provides file system-related functionality, such as reading and writing files.

const m1 = require("./module1");
This line imports a custom module named module1 from the local file system. 
The ./ indicates that the module is located in the same directory as the current script.

const server = http.createServer(function (req, resp) {
  // ...
});
This line creates an HTTP server using the createServer method provided by the http module. 
It takes a callback function as an argument, which will be executed whenever a request is made to the server. 
The req argument represents the incoming request, and the resp argument represents the server's response.

var q = url.parse(req.url, true);
This line of code uses the url.parse method from the url module to parse the req.url property of the HTTP request.
The req.url property contains the URL string of the incoming request. 
It typically includes the pathname, query parameters, and other components of the URL.
The url.parse method takes two arguments: the URL string to parse (req.url) and a boolean value indicating whether to parse the query string as an object (true) or as a raw string (false).
In this case, url.parse(req.url, true) is used with the second argument set to true, indicating that the query string should be parsed and returned as an object.
The parsed URL object is assigned to the variable q, which can then be used to access different components of the URL.
For example, after parsing, you can access the pathname and query properties of the parsed URL object as follows:

console.log(q.pathname); // Outputs the pathname component of the URL
console.log(q.query);    // Outputs the parsed query parameters as an object
The q.pathname represents the path part of the URL, such as "/home" or "/submit-data". It can be used to determine which route or action to take based on the requested path.
The q.query represents the parsed query parameters as an object, where each parameter is a key-value pair. 
For example, if the URL was "/submit-data?num1=10&btn=add", q.query would be { num1: '10', btn: 'add' }. 
These query parameters can be accessed to extract values and perform further operations based on the request.

console.log(q);
This line logs the parsed URL components to the console for debugging purposes.

resp.writeHeader(200, { "content-type": "text/html" });
This line sets the HTTP response header with a status code of 200 (indicating a successful response) and the content-type header field to text/html. 
This tells the browser that the response will be HTML content.

switch (q.pathname) {
  case "/home":
    // ...
    break;
  case "/submit-data":
    // ...
    break;
  default:
    // ...
}
This switch statement checks the pathname property of the parsed URL object q to determine the requested page. 
If the pathname matches "/home", it executes the corresponding code block. 
If the pathname matches "/submit-data", it executes a different code block. 
If neither of these conditions is met, it executes the code block defined in the default case.

case "/home":
  var rs = fs.createReadStream("./public/addition.html");
  rs.pipe(resp);
  break;
This case is executed when the pathname is /home. 
It creates a read stream using fs.createReadStream to read the contents of the file ./public/addition.html. 
The file's content is then piped (sent) to the resp (response) object, which sends it back to the client.

rs.pipe(resp);
In this code, rs is a readable stream created using the createReadStream method from the fs module. 
It reads the contents of the addition.html file located in the public directory.
The pipe method is used to establish a pipe between the readable stream (rs) and the writable stream (resp) of the HTTP response.
The pipe method allows data to be automatically transferred from one stream to another. 
In this case, it takes the data read from the file stream (rs) and pipes it directly to the response stream (resp).
By piping the data, it eliminates the need to manually handle the data events and write the data to the response. 
The data is efficiently streamed from the file to the response, improving performance and memory usage.
In summary, rs.pipe(resp) sets up a pipeline between the file stream (rs) and the response stream (resp). 
It ensures that the contents of the addition.html file are streamed directly to the HTTP response without needing to manually read and write the data.

case "/submit-data":
  // ...
  break;
This case is executed when the pathname is /submit-data. 
It handles the logic for processing data submitted through a form on the client side.

resp.write("num1: " + q.query.num1 + "<br>");
This line adds a string to the response body using the write method of the resp (response) object. 
It displays the value of num1 query parameter obtained from q.query.num1 and appends it to the response body.

resp.write("btn: " + q.query.btn + "<br>");
This line adds another string to the response body. 
It displays the value of the btn query parameter obtained from q.query.btn and appends it to the response body.

if (q.query.btn === "add") {
  // ...
} else {
  // ...
}
This if-else statement checks the value of the btn query parameter to determine which action to perform. 
If the value is "add", it executes the code block inside the if statement. 
Otherwise, it executes the code block inside the else statement.

resp.write("num2: " + q.query.num2 + "<br>");
Inside the if block, this line adds another string to the response body. 
It displays the value of the num2 query parameter obtained from q.query.num2 and appends it to the response body.

var ans = m1.addition(parseInt(q.query.num1), parseInt(q.query.num2));
This line calls the addition function from the m1 module (imported earlier) and passes num1 and num2 values as arguments. 
It converts the values to integers using parseInt since query parameters are usually strings. 
The result of the addition is stored in the ans variable.

resp.end("Addition : " + ans);
This line ends the response and sends the final result to the client. 
It adds the string "Addition : " followed by the value of ans to the response body.

var ans = m1.factorial(parseInt(q.query.num1));
Inside the else block, this line calls the factorial function from the m1 module (imported earlier) and passes num1 value as an argument. 
It converts the value to an integer using parseInt. The result of the factorial calculation is stored in the ans variable.

resp.end("Factorial : " + ans);
This line ends the response and sends the final result to the client. 
It adds the string "Factorial : " followed by the value of ans to the response body.

default:
    resp.write("<h2>on some other page</h2>");
    resp.end();
Inside the default case block, this code is executed when none of the previous cases matched the pathname value. 
It serves as a fallback option for handling requests to unknown or unspecified pages.
The resp.write method is used to add the HTML string <h2>on some other page</h2> to the response body. 
It writes the specified content to the response stream.
After writing the content, the resp.end() method is called to end the response and send it to the client. 
This method signals that the response has been completed and no further data should be sent. 
It is important to call resp.end() to properly finalize the response.
In summary, when the requested pathname does not match any specific case, 
the code inside the default case writes the message <h2>on some other page</h2> to the response body and ends the response,
 ensuring that the client receives the appropriate response indicating that they are on an unspecified page.

server.listen(3001, function () {
    console.log("server running at port 3001")
});
The server.listen method is used to start the HTTP server and make it listen for incoming requests on a specific port. 
In this case, it is configured to listen on port 3001.
The first argument 3001 specifies the port number on which the server should listen. 
Ports are used to identify specific network services, and in this case, the server is configured to listen on port 3001.
The second argument is an anonymous callback function. 
This function is executed once the server starts listening on the specified port. 
In this example, the callback function simply logs the message "server running at port 3001" to the console.
When you run the server code and it successfully starts listening on port 3001, the callback function is executed, and you will see the corresponding message printed in the console.
In summary, the server.listen method is used to start the server and make it listen on a specified port, in this case, port 3001. 
The provided callback function is executed once the server is up and running, allowing you to perform any additional operations or log relevant information.
*/