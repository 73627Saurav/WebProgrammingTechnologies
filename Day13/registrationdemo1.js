//import all packages
const http=require("http");
const url=require("url");
const fs=require("fs");
const m2=require("./module2")

//create server
const server=http.createServer(function(req,resp){
    resp.writeHeader(200,{"content-type":"text/html"})
    var q=url.parse(req.url,true)
    switch(q.pathname){
        case "/home":
            var rs=fs.createReadStream("./public/registeration.html");
            rs.pipe(resp);
            break;
        case "/register":
            var ob={name:q.query.name,addr:q.query.addr,uname:q.query.uname,passwd:q.query.pass}
            var status=m2.adduser(ob);
            if(status){
                resp.write("<h1>successful registration</h1>")
            }
            else{
                resp.write("<h1>dupliacte user name</h1>")
            }
            resp.write("<a href='/login'>login</a><br>")
            resp.end("<a href='/home'>resgister me</a><br>")
            break;
        case "/login":
              var rs1=fs.createReadStream("./public/loginform.html");
              rs1.pipe(resp);
            break;
        case "/validate":
            var ob={uname:q.query.uname,pass:q.query.pass}
            var user=m2.validateuser(ob);
            if(user!=null){
                resp.write("<h1>successful Login</h1>") 
                resp.write("<h1>welcome "+user.name+"</h1>")
            }else{
                resp.write("<h1>unsuccessful Login</h1>") 
            }
            resp.write("<a href='/login'>login</a><br>")
            resp.end("<a href='/home'>resgister me</a><br>")
            break;  


    }

})

//start the server
server.listen(3001,function(){
    console.log("server running on port 3001")

})