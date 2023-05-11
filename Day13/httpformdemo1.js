const http = require("http");
const url = require("url")
const fs = require("fs")
const m1 = require("./module1")

const server = http.createServer(function (req, resp) {
    var q = url.parse(req.url, true);
    console.log(q)
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